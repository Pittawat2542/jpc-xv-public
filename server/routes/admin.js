const path = require("path");
const fs = require("fs");

const _ = require("lodash");
const express = require("express");
const router = express.Router();

const database = require("../utils/database");
const multer = require("../utils/multer-config");

/* Middlewares */

function isAuthenticated(req, res, next) {
  const grantedList = [
    "2310428532366162",
    "2413160515426296",
    "2274506452629085"
  ];
  if (req.isAuthenticated() && grantedList.includes(req.user.id)) return next();

  res.redirect("/login");
}

router.get("/", isAuthenticated, async (req, res) => {
  let countAll = await database.countUsers(false);
  let countCompleted = await database.countUsers(true);

  fs.readFile(
    path.join(__dirname, "..", "/files/count.log"),
    "utf8",
    (err, data) => {
      let countLog = data.replace(new RegExp(require("os").EOL, "g"), "<br>");
      res.render("admin", {
        countAll: countAll[0]["count(*)"],
        countCompleted: countCompleted[0]["count(*)"],
        countLog
      });
    }
  );
});

router.post("/search/user", isAuthenticated, async (req, res) => {
  let id = req.body.id;
  let user = await database.findUserById(id);
  res.send(user);
});

router.post("/search/answer", isAuthenticated, async (req, res) => {
  let id = req.body.id;
  let answer = await database.findAnswerByUserId(id);
  res.send(answer);
});

router.post("/search/user/all", isAuthenticated, async (req, res) => {
  let users = await database.findAllUsers();
  res.send(users);
});

router.post("/search/answer/all", isAuthenticated, async (req, res) => {
  let answers = await database.findAllAnswers();
  res.send(answers);
});

router.post("/edit/picture", isAuthenticated, async (req, res) => {
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
});

router.post("/edit/document", isAuthenticated, async (req, res) => {
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
});

module.exports = router;
