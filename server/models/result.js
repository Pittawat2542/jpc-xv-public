const _ = require("lodash");
const escape = require("escape-html");
const decode = require("unescape");

const knex = require("../db/knex");

const escpaeResult = result => {
  const skipEscape = [
    "user_id",
    "total_score",
    "status",
    "score1",
    "score2",
    "score3",
    "score4",
    "score5",
    "score6"
  ];
  for (let key in result)
    if (!_.isNull(result[key]))
      if (!skipEscape.includes(key)) result[key] = escape(result[key]);
};

const decodeResult = result => {
  const skipDecode = [
    "user_id",
    "total_score",
    "score1",
    "score2",
    "score3",
    "score4",
    "score5",
    "score6",
    "status",
    "created_at",
    "updated_at"
  ];
  for (let key in result)
    if (!skipDecode.includes(key)) result[key] = decode(result[key]);
};

exports.findResultByUserId = async (userId, data) => {
  if (!userId) return null;

  try {
    let results = await knex("jpc_xv_results")
      .select(data)
      .where({
        user_id: userId
      });

    let result = results[0];
    decodeResult(result);
    return result;
  } catch (err) {
    console.error(`${new Date()} 'findResultByUserId': Error due to ${err}`);
  }
};

exports.createOrUpdateResult = async data => {
  escpaeResult(data);

  let result = await this.findResultByUserId(data.user_id);

  if (!_.isEmpty(result)) {
    try {
      await knex(`jpc_xv_results`)
        .update(data)
        .where({
          user_id: data.user_id
        });
    } catch (err) {
      console.error(
        `${new Date()} 'createOrUpdateResult': Error due to ${err}`
      );
    }
  } else {
    try {
      await knex(`jpc_xv_results`).insert(data);
    } catch (err) {
      console.error(
        `${new Date()} 'createOrUpdateResult': Error due to ${err}`
      );
    }
  }
};

exports.updateResultByUserId = async (userId, data) => {
  if (!userId) return null;

  escpaeResult(data);

  try {
    await knex(`jpc_xv_results`)
      .update(data)
      .where({
        user_id: userId
      });
  } catch (err) {
    console.error(`${new Date()} 'updateResultByUserId': Error due to ${err}`);
  }
};

exports.findAllResults = async data => {
  try {
    let results = await knex(`jpc_xv_results`).select(data);
    results.forEach(result => decodeResult(result));
    return results;
  } catch (err) {
    console.error(`${new Date()} 'findAllResults': Error due to ${err}`);
  }
};

exports.countPassed = async () => {
  try {
    let count = await knex(`jpc_xv_results`)
      .select()
      .where({
        status: 1
      })
      .count();
    count = count[0]["count(*)"];
    return count;
  } catch (err) {
    console.error(`${new Date()} 'countPassed': Error due to ${err}`);
  }
};

exports.countSubstitue = async () => {
  try {
    let count = await knex(`jpc_xv_results`)
      .select()
      .where({
        status: 2
      })
      .count();
    count = count[0]["count(*)"];
    return count;
  } catch (err) {
    console.error(`${new Date()} 'countSubstitue': Error due to ${err}`);
  }
};
