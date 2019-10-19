const path = require("path");
const fs = require("fs");

const _ = require("lodash");

const passport = require("../auth/passport");

exports.postAuthFacebook = passport.authenticate("facebook");

exports.getAuthFacebookCallback = passport.authenticate("facebook", {
  successRedirect: "/result",
  failureRedirect: "/login"
});

exports.postAuthFacebookLogout = (req, res) => {
  req.session.destroy(function(err) {
    res.redirect("/");
  });
};

exports.getPicturesFileName = (req, res) => {
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
};

exports.getVerificationPicturesFileName = (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.resolve(
    "server",
    "uploads",
    "pictures",
    "verifications",
    fileName
  );

  try {
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.error(`'/pictures/verifications/${fileName}': Error due to ${err}`);
  }
};

exports.getDocumentsFileName = (req, res) => {
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
};
