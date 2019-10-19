const _ = require("lodash");
const escape = require("escape-html");
const decode = require("unescape");

const knex = require("../db/knex");

const espaceUser = user => {
  const skipEscape = ["is_completed", "index"];
  for (let key in user)
    if (!_.isNull(user[key]))
      if (!skipEscape.includes(key)) user[key] = escape(user[key]);
};

const decodeUser = user => {
  const skipDecode = [
    "id",
    "answer_id",
    "gpa",
    "birth_date",
    "is_completed",
    "index",
    "created_at",
    "updated_at"
  ];
  for (let key in user)
    if (!skipDecode.includes(key)) user[key] = decode(user[key]);
};

exports.findUserById = async (userId, data) => {
  if (!userId) return null;
  try {
    let users = await knex("jpc_xv_users")
      .select(data)
      .where({ id: userId });

    let user = users[0];
    decodeUser(user);
    return user;
  } catch (err) {
    console.error(`${new Date()} 'findUserById': Error due to ${err}`);
  }
};

exports.findOrCreateUserById = async (userId, data) => {
  if (!userId) return null;
  try {
    let user = await this.findUserById(userId, data);
    if (!user) {
      try {
        let newUsers = await knex("jpc_xv_users").insert({
          id: userId,
          ...data
        });
        user = newUsers[0];
      } catch (err) {
        console.error(
          `${new Date()} 'findOrCreateUserById': Cannot create user due to ${err}`
        );
      }
    }
    decodeUser(user);
    return user;
  } catch (err) {
    console.error(`${new Date()} 'findOrCreateUserById': Error due to ${err}`);
  }
};

exports.updateUserById = async (userId, data) => {
  if (!userId) return;
  let updatedData = data;
  espaceUser(updatedData);
  updatedData.updated_at = new Date();
  try {
    await knex("jpc_xv_users")
      .update(updatedData)
      .where({ id: userId });
  } catch (err) {
    console.error(`${new Date()} 'updateUserById': Error due to ${err}`);
  }
};

exports.findAllUsers = async (data, condition) => {
  try {
    let users;
    if (!condition) {
      users = await knex("jpc_xv_users").select(data);
    } else {
      users = await knex("jpc_xv_users")
        .select(data)
        .where(condition);
    }

    return users;
  } catch (err) {
    console.error(`${new Date()} 'findAllUsers': Error due to ${err}`);
  }
};

exports.countUsers = async isCompleted => {
  if (!isCompleted) isCompleted = false;
  let constriant = isCompleted
    ? {
        is_completed: 1
      }
    : undefined;

  try {
    let countUsers = await knex("jpc_xv_users")
      .select(constriant)
      .count();

    return countUsers;
  } catch (err) {
    console.error(`${new Date()} 'countUsers': Error due to ${err}`);
  }
};

exports.countCompletedUsers = async () => {
  try {
    return await knex("jpc_xv_users")
      .select()
      .whereNotNull("index")
      .count();
  } catch (err) {
    console.error(`${new Date()} 'countCompletedUsers': Error due to ${err}`);
  }
};

exports.findUsersByManyIds = async (userIds, data) => {
  if (!userIds) return null;
  try {
    let users = await knex("jpc_xv_users")
      .select(data)
      .whereIn("id", userIds);

    users.forEach(user => decodeUser(user));
    return users;
  } catch (err) {
    console.error(`${new Date()} 'findUsersByManyIds': Error due to ${err}`);
  }
};
