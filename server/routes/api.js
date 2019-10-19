const path = require("path");
const fs = require("fs");

const _ = require("lodash");
const express = require("express");
const formidable = require("formidable");

const router = express.Router();

const passport = require("../auth/passport");

const database = require("../utils/database");

const isCloseRegister = new Date() > new Date(2019, 5, 18, 23, 59, 00);

/* Middlewares */

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/");
}

// Routes

router.post("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/register",
    failureRedirect: "/login"
  })
);

router.post("/auth/facebook/logout", isAuthenticated, (req, res) => {
  req.logOut();
  res.redirect("/");
});

router.get("/pictures/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.resolve("server", "uploads", "pictures", fileName);

  try {
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(`'/pictures/${fileName}': Error due to ${err}`);
  }
});

router.get("/documents/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join("server", "uploads", "documents", fileName);

  try {
    if (fs.existsSync(filePath)) {
      res.download(filePath);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(`'/pictures/${fileName}': Error due to ${err}`);
  }
});

router.post("/register/1", async (req, res) => {
  if (isCloseRegister) return res.sendStatus(404);
  const {
    user,
    th_first_name,
    th_last_name,
    en_first_name,
    en_last_name,
    nick_name,
    gender,
    birth_date,
    religion,
    national_id,
    diseases,
    food_allergy,
    medicine_allergy,
    blood_group,
    phone_number,
    email
  } = req.body;

  await database.findOrCreateUserById(user.id);
  await database.updateUserById(user.id, {
    th_first_name,
    th_last_name,
    en_first_name,
    en_last_name,
    nick_name,
    gender,
    birth_date,
    religion,
    national_id,
    diseases,
    food_allergy,
    medicine_allergy,
    blood_group,
    phone_number,
    email
  });

  res.sendStatus(200).end();
});

router.post("/register/2", async (req, res) => {
  if (isCloseRegister) return res.sendStatus(404);
  const {
    user,
    parent_name,
    parent_phone_number,
    parent_relation,
    school,
    education_level,
    education_program,
    gpa
  } = req.body;

  await database.findOrCreateUserById(user.id);
  await database.updateUserById(user.id, {
    parent_name,
    parent_phone_number,
    parent_relation,
    school,
    education_level,
    education_program,
    gpa
  });

  res.sendStatus(200).end();
});

router.post("/register/3", async (req, res) => {
  if (isCloseRegister) return res.sendStatus(404);
  const { user, answer1, answer2, answer2_choice, answer3 } = req.body;

  await database.updateAnswerByUserId(user.id, {
    answer1,
    answer2,
    answer2_choice,
    answer3
  });

  res.sendStatus(200).end();
});

router.post("/register/4", async (req, res) => {
  if (isCloseRegister) return res.sendStatus(404);
  const { user, answer4, answer5, answer6 } = req.body;

  await database.updateAnswerByUserId(user.id, {
    answer4,
    answer5,
    answer6
  });

  res.sendStatus(200).end();
});

router.post("/register/review", async (req, res) => {
  if (isCloseRegister) return res.sendStatus(404);
  const { user } = req.body;

  await database.updateUserById(user.id, {
    is_completed: true
  });

  res.sendStatus(200).end();
});

router.post("/upload/pictures", (req, res) => {
  if (!req.user) {
    res.sendStatus(403);
    return;
  }

  const maxFileSize = 5 * 1024 * 1024;
  const form = new formidable.IncomingForm({
    uploadDir: path.join(__dirname, "..", "/uploads/pictures")
  });
  form
    .on("progress", (bytesReceived, bytesExpected) => {
      if (bytesReceived > maxFileSize) {
        form._error(new Error("File size exceed limit: " + bytesReceived));
      }
    })
    .on("fileBegin", (name, file) => {
      const fileType = file.type.split("/").pop();
      if (fileType == "jpg" || fileType == "png" || fileType == "jpeg") {
        file.path =
          form.uploadDir + "/" + name + "-" + Date.now() + "." + fileType;
      } else {
        setTimeout(() => {
          fs.unlink(file.path, err => {
            if (err) console.error(`${new Date()} '/upload/pictures': ${err}`);
          });
        }, 1);
        form._error(new Error("Incorrect file type: " + fileType));
      }
    })
    .parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400).send(err.message);
        return;
      }

      if (_.isEmpty(files)) {
        res.status(400).send("No file selected");
        return;
      }

      let fileName = files.picture.path.split("/").pop();
      res.send({ fileName: fileName });

      try {
        let user = await database.findUserById(req.user.id);
        let oldFile = user.profile_picture_file_name;
        if (!_.isEmpty(oldFile)) {
          fs.unlink(
            path.resolve("server", "uploads", "pictures", oldFile),
            err => {
              if (err) {
                console.warn(
                  `${new Date()} '/upload/pictures': cannot remove file due to ${err}`
                );
              }
            }
          );
        }

        await database.updateUserById(req.user.id, {
          profile_picture_file_name: fileName
        });
      } catch (err) {
        console.error(`${new Date()} '/upload/pictures': Error due to ${err}`);
      }
    });
});

router.post("/upload/documents", (req, res) => {
  if (isCloseRegister) return res.sendStatus(404);
  if (!req.user) {
    res.sendStatus(403);
    return;
  }

  const maxFileSize = 10 * 1024 * 1024;
  const form = new formidable.IncomingForm({
    uploadDir: path.join(__dirname, "..", "/uploads/documents")
  });
  form
    .on("progress", (bytesReceived, bytesExpected) => {
      if (bytesReceived > maxFileSize) {
        form._error(new Error("File size exceed limit: " + bytesReceived));
      }
    })
    .on("fileBegin", (name, file) => {
      const fileType = file.type.split("/").pop();
      if (
        fileType == "jpg" ||
        fileType == "png" ||
        fileType == "jpeg" ||
        fileType == "pdf"
      ) {
        file.path =
          form.uploadDir + "/" + name + "-" + Date.now() + "." + fileType;
      } else {
        setTimeout(() => {
          fs.unlink(file.path, err => {
            if (err) console.error(`${new Date()} '/upload/documents': ${err}`);
          });
        }, 1);
        form._error(new Error("Incorrect file type: " + fileType));
      }
    })
    .parse(req, async (err, fields, files) => {
      if (err) {
        res.status(400).send(err.message);
        return;
      }

      if (_.isEmpty(files)) {
        res.status(400).send("No file selected");
        return;
      }

      let fileName = files.document.path.split("/").pop();
      res.send({ fileName: fileName });

      try {
        let user = await database.findUserById(req.user.id);
        let oldFile = user.grade_report_file_name;
        if (!_.isEmpty(oldFile)) {
          fs.unlink(
            path.resolve("server", "uploads", "documents", oldFile),
            err => {
              if (err) {
                console.warn(
                  `${new Date()} '/upload/documents': cannot remove file due to ${err}`
                );
              }
            }
          );
        }

        await database.updateUserById(req.user.id, {
          grade_report_file_name: fileName
        });
      } catch (err) {
        console.error(`${new Date()} '/upload/documents': Error due to ${err}`);
      }
    });
});

module.exports = router;
