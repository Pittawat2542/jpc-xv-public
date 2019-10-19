const _ = require("lodash");
const escape = require("escape-html");
const decode = require("unescape");

const knex = require("../db/knex");

const escpaeScore = score => {
  const skipEscape = ["user_id", "staff_id", "score"];
  for (let key in score)
    if (!_.isNull(score[key]))
      if (!skipEscape.includes(key)) score[key] = escape(score[key]);
};

const decodeScore = score => {
  const skipDecode = [
    "user_id",
    "staff_id",
    "score",
    "created_at",
    "updated_at"
  ];
  for (let key in score)
    if (!skipDecode.includes(key)) score[key] = decode(score[key]);
};

exports.findScoresByUserId = async (questionNumber, userId, data) => {
  if (!questionNumber || !userId) return null;

  try {
    let scores = await knex(`jpc_xv_score${questionNumber}`)
      .select(data)
      .where({
        user_id: userId
      });

    scores.forEach(score => decodeScore(score));
    return scores;
  } catch (err) {
    console.error(`${new Date()} 'findScoresByUserId': Error due to ${err}`);
  }
};

exports.createOrUpdateScores = async (questionNumber, data) => {
  if (!questionNumber) return null;
  escpaeScore(data);

  let score = await knex(`jpc_xv_score${questionNumber}`)
    .select()
    .where({
      user_id: data.user_id,
      staff_id: data.staff_id
    });

  if (!_.isEmpty(score)) {
    try {
      await knex(`jpc_xv_score${questionNumber}`)
        .update(data)
        .where({
          user_id: data.user_id,
          staff_id: data.staff_id
        });
    } catch (err) {
      console.error(
        `${new Date()} 'createOrUpdateScores': Error due to ${err}`
      );
    }
  } else {
    try {
      await knex(`jpc_xv_score${questionNumber}`).insert(data);
    } catch (err) {
      console.error(
        `${new Date()} 'createOrUpdateScores': Error due to ${err}`
      );
    }
  }
};
