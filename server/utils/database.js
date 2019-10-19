const _ = require("lodash");
const escape = require("escape-html");
const decode = require("unescape");
const knex = require("../db/knex");

const findUserById = async userId => {
  try {
    let user = await knex("jpc_xv_users")
      .select()
      .where({
        id: userId
      });
    let result = user[0];

    for (var key in result) {
      if (
        key != "answer_id" &&
        key != "gpa" &&
        key != "birth_date" &&
        key != "is_completed" &&
        key != "created_at" &&
        key != "updated_at"
      )
        result[key] = decode(result[key]);
    }

    return result;
  } catch (err) {
    console.error(
      `${new Date()} 'findUserById': Error with user id ${userId} due to ${err}`
    );
  }
};

const findOrCreateUserById = async userId => {
  try {
    // Find user, if exist
    let user = await findUserById(userId);

    if (_.isEmpty(user)) {
      // Cannot find user, create a new one
      try {
        let users = await knex("jpc_xv_users").insert({
          id: userId
        });
        user = users[0];
      } catch (e) {
        console.error(
          `${new Date()} 'findOrCreateUserById' Try to create new user with user id ${userId}, but found error ${e}`
        );
      }
    }

    let result = user;

    for (var key in result) {
      if (
        key != "answer_id" &&
        key != "gpa" &&
        key != "birth_date" &&
        key != "is_completed" &&
        key != "created_at" &&
        key != "updated_at"
      )
        result[key] = decode(result[key]);
    }

    return result;
  } catch (err) {
    console.error(
      `${new Date()} 'findOrCreateUserById': Error with user id ${userId} due to ${err}`
    );
  }
};

const updateUserById = async (userId, data) => {
  try {
    let updateData = {};

    for (let key in data) {
      if (!_.isNull(data[key])) {
        if (key != "is_completed") updateData[key] = escape(data[key]);
        else updateData[key] = data[key];
      }
    }

    try {
      await knex("jpc_xv_users")
        .update(updateData)
        .where({
          id: userId
        });
    } catch (e) {
      console.error(
        `${new Date()} 'updateUserById' Try to update user data with user id ${userId}, but found error ${e}`
      );
    }
  } catch (err) {
    console.error(
      `${new Date()} 'updateUserById': Error with user id ${userId} due to ${err}`
    );
  }
};

const findAnswerByUserId = async userId => {
  try {
    let user = await findUserById(userId);
    if (_.isUndefined(user)) return null;

    let answers = await knex("jpc_xv_answers")
      .select()
      .where({
        id: user.answer_id
      });

    let result = answers[0];

    for (var key in result) {
      if (key != "id" && key != "created_at" && key != "updated_at")
        result[key] = decode(result[key]);
    }

    return result;
  } catch (err) {
    console.error(
      `${new Date()} 'findAnswerByUserId': Error with user id ${userId} due to ${err}`
    );
  }
};

const updateAnswerByUserId = async (userId, data) => {
  try {
    let user = await findOrCreateUserById(userId);
    let answerId = user.answer_id;

    if (!_.isNumber(answerId)) {
      // Cannot find answer, create new one
      try {
        answerId = await knex("jpc_xv_answers").insert({});
        await updateUserById(userId, {
          answer_id: answerId[0]
        });
      } catch (e) {
        console.error(
          `${new Date()} 'updateAnswerByUserId' Try to create new answer data with user id ${userId}, but found error ${e}`
        );
      }
    }

    let updateData = {};

    for (let key in data) {
      if (!_.isNull(data[key])) {
        updateData[key] = escape(data[key]);
      }
    }

    try {
      await knex("jpc_xv_answers")
        .update(updateData)
        .where({
          id: answerId
        });
    } catch (e) {
      console.error(
        `${new Date()} 'updateAnswerByUserId' Try to update answer data with answer id ${answerId}, but found error ${e}`
      );
    }
  } catch (err) {
    console.error(
      `${new Date()} 'updateAnswerByUserId': Error with user id ${userId} due to ${err}`
    );
  }
};

const checkAllFieldsNotNull = async userId => {
  let user = await findUserById(userId);
  let answer = await findAnswerByUserId(userId);

  for (let key in user) {
    if (
      (_.isNull(user[key]) ||
        (_.isEmpty(user[key]) &&
          !_.isNumber(user[key]) &&
          !_.isDate(user[key]))) &&
      key != "diseases" &&
      key != "food_allergy" &&
      key != "medicine_allergy"
    ) {
      return false;
    }
  }

  for (let key in answer) {
    if (
      (_.isNull(answer[key]) ||
        (_.isEmpty(answer[key]) &&
          !_.isNumber(answer[key]) &&
          !_.isDate(answer[key]))) &&
      key != "id"
    ) {
      return false;
    }
  }

  return true;
};

const findAllUsers = async () => {
  try {
    return await knex("jpc_xv_users").select();
  } catch (err) {
    console.error(`'findAllUsers': ERROR ${err}`);
  }
};

const findAllAnswers = async () => {
  try {
    return await knex("jpc_xv_answers").select();
  } catch (err) {
    console.error(`'findAllAnswers': ERROR ${err}`);
  }
};

const countUsers = async isCompleted => {
  if (!isCompleted) {
    try {
      return await knex("jpc_xv_users")
        .select()
        .count();
    } catch (err) {
      console.error(`'countUsers': ERROR is_completed = ${isCompleted} ${err}`);
    }
  } else {
    try {
      return await knex("jpc_xv_users")
        .select()
        .where({
          is_completed: true
        })
        .count();
    } catch (err) {
      console.error(`'countUsers': ERROR is_completed = ${isCompleted} ${err}`);
    }
  }
};

module.exports = {
  findUserById,
  findOrCreateUserById,
  updateUserById,
  findAnswerByUserId,
  updateAnswerByUserId,
  checkAllFieldsNotNull,
  findAllUsers,
  findAllAnswers,
  countUsers
};
