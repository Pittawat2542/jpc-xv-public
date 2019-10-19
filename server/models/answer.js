const _ = require("lodash");
const escape = require("escape-html");
const decode = require("unescape");

const knex = require("../db/knex");
const User = require("./user");

const escapeAnswer = answer => {
  for (let key in answer)
    if (!_.isNull(answer[key])) answer[key] = escape(answer[key]);
};

const decodeAnswer = answer => {
  const skipDecode = ["id", "created_at", "updated_at"];
  for (let key in answer)
    if (!skipDecode.includes(key)) answer[key] = decode(answer[key]);
};

exports.findAnswerByUserId = async (userId, data) => {
  if (!userId) return null;
  let user = await User.findUserById(userId, ["answer_id"]);
  if (!user || !user.answer_id) return null;
  try {
    let answers = await knex("jpc_xv_answers")
      .select(data)
      .where({
        id: user.answer_id
      });
    let answer = answers[0];
    decodeAnswer(answer);
    return answer;
  } catch (err) {
    console.error(`${new Date()} 'findAnswerByUserId': Error due to ${err}`);
  }
};

exports.findAnswerById = async (answerId, data) => {
  if (!answerId) return null;
  try {
    let answers = await knex("jpc_xv_answers")
      .select(data)
      .where({ id: answerId });

    let answer = answers[0];
    decodeAnswer(answer);
    return answer;
  } catch (err) {
    console.error(`${new Date()} 'findAnswerById': Error due to ${err}`);
  }
};

exports.updateOrCreateAnswerByUserId = async (userId, data) => {
  if (!userId) return;
  let answer = await User.findAnswerByUserId(userId, null);
  let answerId = answer.id;
  if (!answer) {
    let answersId = await knex("jpc_xv_answers").insert({});
    answerId = answersId[0];
    try {
      await User.updateUserById(userId, {
        answer_id: answerId,
        updated_at: new Date()
      });
    } catch (err) {
      console.error(
        `${new Date()} 'updateOrCreateAnswerByUserId': Error due to ${err}`
      );
    }
  }

  escapeAnswer(data);
  data.updated_at = new Date();
  try {
    await knex("jpc_xv_answers")
      .update(data)
      .where({
        id: answerId
      });
  } catch (err) {
    console.error(
      `${new Date()} 'updateOrCreateAnswerByUserId': Error due to ${err}`
    );
  }
};

// exports.updateOrCreateAnswerById = (answerId, data) => {};

exports.findAllAnswers = async (data, condition) => {
  try {
    let answers;
    if (!condition) {
      answers = await knex("jpc_xv_answers").select(data);
      return answers;
    } else {
      answers = await knex("jpc_xv_answers")
        .select(data)
        .where(condition);
      return answers;
    }
  } catch (err) {
    console.error(`${new Date()} 'findAllAnswers': Error due to ${err}`);
  }
};

exports.findAnswersByManyIds = async (answerIds, data) => {
  if (!answerIds) return null;
  try {
    let answers = await knex("jpc_xv_answers")
      .select(data)
      .whereIn("id", answerIds);

    answers.forEach(answer => decodeAnswer(answer));
    return answers;
  } catch (err) {
    console.error(`${new Date()} 'findAnswersByManyIds': Error due to ${err}`);
  }
};
