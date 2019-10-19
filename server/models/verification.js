const _ = require("lodash");
const escape = require("escape-html");
const decode = require("unescape");

const knex = require("../db/knex");

const espaceVerification = verification => {
  const skipEscape = ["created_at", "updated_at"];
  for (let key in verification)
    if (!_.isNull(verification[key]))
      if (!skipEscape.includes(key))
        verification[key] = escape(verification[key]);
};

const decodeVerification = verification => {
  const skipDecode = ["user_id", "created_at", "updated_at"];
  for (let key in verification)
    if (!skipDecode.includes(key))
      verification[key] = decode(verification[key]);
};

exports.findVerificationByUserId = async (userId, data) => {
  if (!userId) return null;

  try {
    let verifications = await knex("jpc_xv_verifications")
      .select(data)
      .where({
        user_id: userId
      });
    let verification = verifications[0];
    decodeVerification(verification);
    return verification;
  } catch (err) {
    console.error(
      `${new Date()} 'findVerificationByUserId': Error due to ${err}`
    );
  }
};

exports.findVerificationByManyUserIds = async (userIds, data) => {
  if (!userIds) return null;
  try {
    let verifications = await knex("jpc_xv_verifications")
      .select(data)
      .whereIn("user_id", userIds);

    verifications.forEach(verification => decodeVerification(verification));
    return verifications;
  } catch (err) {
    console.error(`${new Date()} 'findUsersByManyIds': Error due to ${err}`);
  }
};

exports.findAllVerifications = async (data, condition) => {
  try {
    let verifications;
    if (!condition) {
      verifications = await knex("jpc_xv_verifications").select(data);
    } else {
      verifications = await knex("jpc_xv_verifications")
        .select(data)
        .where(condition);
    }

    return verifications;
  } catch (err) {
    console.error(`${new Date()} 'findAllVerifications': Error due to ${err}`);
  }
};

exports.createOrUpdateVerification = async data => {
  espaceVerification(data);

  let verification = await this.findVerificationByUserId(data.user_id);

  if (!_.isEmpty(verification)) {
    try {
      await knex(`jpc_xv_verifications`)
        .update(data)
        .where({
          user_id: data.user_id
        });
    } catch (err) {
      console.error(
        `${new Date()} 'createOrUpdateVerification': Error due to ${err}`
      );
    }
  } else {
    try {
      await knex(`jpc_xv_verifications`).insert(data);
    } catch (err) {
      console.error(
        `${new Date()} 'createOrUpdateVerification': Error due to ${err}`
      );
    }
  }
};
