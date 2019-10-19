const path = require("path");

const _ = require("lodash");
const express = require("express");
const axios = require("axios");

const router = express.Router();

// Helper functions
const dateHelper = require("../utils/date");
const database = require("../utils/database");

const isCloseRegister = new Date() > new Date(2019, 5, 18, 23, 59, 00);

/* Middlewares */

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();

  res.redirect("/");
}

router.get("/", async (req, res) => {
  let userData = req.user && (await database.findUserById(req.user.id));
  let isRegisterCompleted = userData && userData.is_completed;
  res.render("index", {
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
    user: req.user,
    isRegisterCompleted,
    isCloseRegister
  });
});

router.get("/login", (req, res) => {
  if (req.user) res.redirect("/");
  else res.render("login");
});

router.get("/register", isAuthenticated, (req, res) => {
  if (isCloseRegister) return res.redirect("/");
  res.redirect("/register/1");
});

router.get("/register/:step", isAuthenticated, async (req, res) => {
  if (isCloseRegister) return res.redirect("/");
  let userId = req.user.id;
  try {
    let userData = await database.findUserById(userId);
    let answerData = await database.findAnswerByUserId(userId);

    if (userData && userData.is_completed) {
      res.redirect("/");
      return;
    }

    let dateObject = userData && dateHelper.getDateObject(userData.birth_date);
    let dateFormatted =
      (userData &&
        new Date(dateObject.year, dateObject.month, dateObject.day)) ||
      new Date();

    let dataValid = await database.checkAllFieldsNotNull(userId);

    res.render("register", {
      user: req.user,
      step: req.params.step,
      dateFormatted,
      userData,
      answerData,
      dataValid,
      userId
    });
  } catch (e) {
    console.error(e);
  }
});

router.post("/register/:step", isAuthenticated, (req, res) => {
  if (isCloseRegister) return res.sendStatus(404);
  const step = req.params.step;
  const action = req.body.action;
  const data = req.body;

  if (step > 0 && step < 4) {
    axios.post(`${process.env.HOST_URL}/api/register/${step}`, {
      user: req.user,
      ...data,
      birth_date:
        req.body.birth_date == "" || !req.body.birth_date
          ? dateHelper.getDate()
          : dateHelper.formatDate(req.body.birth_date)
    });
    if (step > 1 && action == "prev") {
      res.redirect(`/register/${parseInt(step) - 1}`);
    } else {
      res.redirect(`/register/${parseInt(step) + 1}`);
    }
  } else if (step == 4) {
    axios.post(`${process.env.HOST_URL}/api/register/${step}`, {
      user: req.user,
      ...data
    });
    if (action == "prev") {
      res.redirect(`/register/${parseInt(step) - 1}`);
    } else {
      res.redirect(`/register/review`);
    }
  } else if (step == "review") {
    if (action == "prev") {
      res.redirect(`/register/4`);
    } else {
      axios.post(`${process.env.HOST_URL}/api/register/${step}`, {
        user: req.user,
        ...data
      });
      res.redirect("/register/complete");
    }
  } else {
    res.redirect("/");
  }
});

module.exports = router;
