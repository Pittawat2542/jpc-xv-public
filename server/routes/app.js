const express = require("express");

const router = express.Router();

const appController = require("../controllers/app");
const authMiddleware = require("../middlewares/auth");

router.get("/", appController.getIndex);

router.get("/login", appController.getLogin);

router.get("/check-id", authMiddleware.isAuthenticated, (req, res) =>
  res.send(req.user.id)
);

module.exports = router;
