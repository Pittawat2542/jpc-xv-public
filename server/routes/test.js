const express = require("express");
const router = express.Router();

const _ = require("lodash");
const path = require("path");
const fs = require("fs");
const formidable = require("formidable");
const multer = require("../utils/multer-config");
const database = require("../utils/database");

router.get("/", (req, res) => res.render("test"));

router.post("/", (req, res) => {
  multer.uploadPicture(req, res, err => {
    console.log(req.body);
    console.log(req.user);
    console.log(req.file);
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.sendStatus(200);
  });
});

router.post("/search", async (req, res) => {
  let id = req.body.id;
  let user = await database.findUserById(id);
  res.send(user);
});

router.post("/submit-form", (req, res) => {
  const maxFileSize = 10 * 1024 * 1024;
  const form = new formidable.IncomingForm({
    uploadDir: path.join(__dirname, "..", "/uploads/documents")
  });
  form
    .on("progress", (bytesReceived, bytesExpected) => {
      if (bytesReceived > maxFileSize) {
        form._error(new Error("file size exceed limit: " + bytesReceived));
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
            if (err) console.error(err);
          });
        }, 1);
        form._error(new Error("incorrect file type: " + fileType));
      }
    })
    .parse(req, (err, fields, files) => {
      if (err) {
        res.status(400).send(err.message);
        return;
      }

      if (_.isEmpty(files)) {
        res.status(400).send("No file selected");
        return;
      }

      let fileName = files.document.path.split("/").pop();
      res.send({ filename: fileName });
    });
});

module.exports = router;
