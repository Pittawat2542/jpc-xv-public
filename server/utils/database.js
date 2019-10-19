const _ = require("lodash");

const User = require("../models/user");
const Answer = require("../models/answer");
const Staff = require("../models/staff");
const Result = require("../models/result");
const Verification = require("../models/verification");
const Scores = require("../models/score");

const isUserAnswerCompleted = async userId => {
  if (!userId) return false;
  let user = await User.findUserById(userId, null);
  if (!user || !user.answer_id) return false;
  for (let key in user) {
    if (
      (_.isNull(user[key]) ||
        (_.isEmpty(user[key]) &&
          !_.isNumber(user[key]) &&
          !_.isDate(user[key]))) &&
      key !== "diseases" &&
      key !== "food_allergy" &&
      key !== "medicine_allergy"
    ) {
      return false;
    }
  }
  let answer = await Answer.findAnswerById(user.answer_id, null);
  for (let key in answer) {
    if (
      (_.isNull(answer[key]) ||
        (_.isEmpty(answer[key]) &&
          !_.isNumber(answer[key]) &&
          !_.isDate(answer[key]))) &&
      key !== "id"
    ) {
      return false;
    }
  }
  return true;
};

module.exports = {
  isUserAnswerCompleted,
  ...User,
  ...Answer,
  ...Staff,
  ...Result,
  ...Verification,
  ...Scores
};
