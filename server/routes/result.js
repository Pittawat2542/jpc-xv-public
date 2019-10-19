const express = require("express");

const router = express.Router();

const resultController = require("../controllers/result");
const authMiddleware = require("../middlewares/auth");

router.get("/", authMiddleware.isAuthenticated, resultController.getIndex);

router.post("/", authMiddleware.isAuthenticated, resultController.postIndex);

router.get(
  "/complete",
  authMiddleware.isAuthenticated,
  resultController.getComplete
);

module.exports = router;
