const _ = require("lodash");
const escape = require("escape-html");
const decode = require("unescape");

const knex = require("../db/knex");

const espaceStaff = staff => {
  const skipEscape = ["staff_id"];
  for (let key in staff)
    if (!_.isNull(staff[key]))
      if (!skipEscape.includes(key)) staff[key] = escape(staff[key]);
};

const decodeStaff = staff => {
  const skipDecode = ["staff_id", "current_index", "created_at", "updated_at"];
  for (let key in staff)
    if (!skipDecode.includes(key)) staff[key] = decode(staff[key]);
};

exports.findStaffById = async (staffId, data) => {
  if (!staffId) return null;
  try {
    let staffs = await knex("jpc_xv_staffs")
      .select(data)
      .where({ staff_id: staffId });

    let staff = staffs[0];
    decodeStaff(staff);
    return staff;
  } catch (err) {
    console.error(`${new Date()} 'findStaffById': Error due to ${err}`);
  }
};

exports.findAllStaffs = async (data, condition) => {
  try {
    let staffs;
    if (!condition) {
      staffs = await knex("jpc_xv_staffs").select(data);
    } else {
      staffs = await knex("jpc_xv_staffs")
        .select(data)
        .where(condition);
    }

    return staffs;
  } catch (err) {
    console.error(`${new Date()} 'findAllStaffs': Error due to ${err}`);
  }
};

exports.createStaff = async data => {
  espaceStaff(data);
  try {
    await knex("jpc_xv_staffs").insert(data);
  } catch (err) {
    console.error(`${new Date()} 'createStaff': Error due to ${err}`);
  }
};

exports.updateStaffById = async (staffId, data) => {
  if (!staffId) return null;
  espaceStaff(data);

  try {
    await knex("jpc_xv_staffs")
      .update(data)
      .where({
        staff_id: staffId
      });
  } catch (err) {
    console.error(`${new Date()} 'updateStaffById': Error due to ${err}`);
  }
};
