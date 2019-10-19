const fs = require("fs");
const path = require("path");

const _ = require("lodash");

const database = require("../utils/database");
const multer = require("../utils/multer-config");

exports.getActivate = async (req, res) => {
  let users = await database.findAllUsers(null, {
    is_completed: 1
  });
  users.forEach(async (user, index) => {
    await database.updateUserById(user.id, {
      index
    });
  });
  res.redirect("/");
};

exports.getUsers = async (req, res) => {
  let countAll = await database.countUsers();
  let countCompleted = await database.countCompletedUsers();
  countAll = countAll[0]["count(*)"];
  countCompleted = countCompleted[0]["count(*)"];

  res.render("admin-users", {
    pageTitle: "Junior Programmers Camp XV - Admin - Users",
    countAll,
    countCompleted
  });
};

exports.getStaffs = async (req, res) => {
  let countPassed = await database.countPassed();
  let countSubstitue = await database.countSubstitue();
  let countAllCompletedUsers = await database.countCompletedUsers();
  countAllCompletedUsers = countAllCompletedUsers[0]["count(*)"];
  let staffs = await database.findAllStaffs();
  let users = await database.findAllResults(["user_id", "status"]);
  passedUsers = users.filter(user => user.status === 1);
  const passedUserIds = passedUsers.map(passedUser => passedUser.user_id);
  const passedUserInfos = await database.findUsersByManyIds(passedUserIds);
  passedUsers.map(
    (passedUser, index) => (passedUser.info = passedUserInfos[index])
  );
  const verifications = await database.findVerificationByManyUserIds(
    passedUserIds
  );

  res.render("admin-staffs", {
    pageTitle: "Junior Programmers Camp XV - Admin - Staffs",
    countPassed,
    countSubstitue,
    countAllCompletedUsers,
    staffs,
    passedUsers,
    verifications
  });
};

exports.postStaffsVerification = async (req, res) => {
  const { user_id } = req.body;
  let verification = await database.findVerificationByUserId(user_id);
  res.send(verification);
};

exports.postSeachUser = async (req, res) => {
  let id = req.body.id;
  let user = await database.findUserById(id);
  res.send(user);
};

exports.postSearchAnswer = async (req, res) => {
  let id = req.body.id;
  let answer = await database.findAnswerByUserId(id);
  res.send(answer);
};

exports.postSearchAllUsers = async (req, res) => {
  let users = await database.findAllUsers();
  res.send(users);
};

exports.postSearchAllCompletedUsers = async (req, res) => {
  let users = await database.findAllUsers(null, { is_completed: 1 });
  res.send(users);
};

exports.postSearchAllAnswers = async (req, res) => {
  let answers = await database.findAllAnswers();
  res.send(answers);
};

exports.postEditPicture = async (req, res) => {
  let userId = req.header("User-Id");

  if (_.isUndefined(userId)) {
    res.status(400).send({
      error: "PLEASE SPECIFY USER ID"
    });
    return;
  }

  let user;

  try {
    user = await database.findUserById(userId);
  } catch (err) {
    res.status(500).send({
      error: `DATABASE ERROR: ${err}`
    });
    return;
  }

  multer.uploadPicture(req, res, err => {
    if (err) {
      res.status(400).send({
        error: err
      });
      return;
    }

    if (!req.file) {
      res.status(500).send({
        error: "SERVER ERROR: CANNOT CREATE FILE"
      });
      return;
    }

    let fileName = user.profile_picture_file_name;
    if (!_.isEmpty(fileName)) {
      fs.unlink(
        path.resolve("server", "uploads", "pictures", fileName),
        err => {
          if (err) {
            console.warn(
              `${new Date()} 'uploadPicture': cannot remove file due to ${err}`
            );
          }
        }
      );
    }

    database.updateUserById(userId, {
      profile_picture_file_name: req.file.filename
    });

    res.send({ fileName: req.file.filename });
  });
};

exports.postEditDocument = async (req, res) => {
  let userId = req.header("User-Id");

  if (_.isUndefined(userId)) {
    res.status(400).send({
      error: "PLEASE SPECIFY USER ID"
    });
    return;
  }

  let user;

  try {
    user = await database.findUserById(userId);
  } catch (err) {
    res.status(500).send({
      error: `DATABASE ERROR: ${err}`
    });
    return;
  }

  multer.uploadDocument(req, res, err => {
    if (err) {
      res.status(400).send({
        error: err
      });
      return;
    }

    if (!req.file) {
      res.status(500).send({
        error: "SERVER ERROR: CANNOT CREATE FILE"
      });
      return;
    }

    let fileName = user.grade_report_file_name;
    if (!_.isEmpty(fileName)) {
      fs.unlink(
        path.resolve("server", "uploads", "pictures", fileName),
        err => {
          if (err) {
            console.warn(
              `${new Date()} 'uploadDocument': cannot remove file due to ${err}`
            );
          }
        }
      );
    }

    database.updateUserById(userId, {
      grade_report_file_name: req.file.filename
    });

    res.send({ fileName: req.file.filename });
  });
};

exports.postCalculateScore = async (req, res) => {
  let results = await database.findAllResults();
  results.forEach(async result => {
    await database.updateResultByUserId(result.user_id, {
      total_score: Math.round(
        (result.score1 * 0.3 +
          result.score2 * 0.15 +
          result.score3 * 0.15 +
          result.score4 * 0.3 +
          result.score5 * 0.1 +
          result.score6 * 0) *
          5
      )
    });
  });
  res.redirect("/");
};

exports.postEditVerification = async (req, res) => {
  let userId = req.header("User-Id");

  if (_.isUndefined(userId)) {
    return res.status(400).send({
      error: "PLEASE SPECIFY USER ID"
    });
  }

  try {
    const result = await database.findResultByUserId(userId, ["status"]);

    if (!result || result.status !== 1) return res.sendStatus(403);

    multer.uploadVerificationPicture(req, res, async err => {
      if (err) {
        return res.status(400).send({
          error: err
        });
      }

      const { pickup_location, shirt_size } = req.body;
      if (!pickup_location || !shirt_size) return res.sendStatus(404);
      await database.createOrUpdateVerification({
        user_id: userId,
        pickup_location,
        shirt_size,
        verification_proof_file_name: req.file.filename
      });
      res.redirect("/admin/users");
    });
  } catch (err) {
    console.error(err);
  }
};
