const express = require("express");

const router = express.Router();

const staffController = require("../controllers/staff");
const authMiddleware = require("../middlewares/auth");

router.get("/", authMiddleware.isStaff, staffController.getIndex);

router.post("/", authMiddleware.isStaff, staffController.postIndex);

router.get("/register", authMiddleware.isStaff, staffController.getRegister);

router.post("/register", authMiddleware.isStaff, staffController.postRegister);

router.get("/all", authMiddleware.isStaff, staffController.getAll);

router.post("/all", authMiddleware.isStaff, staffController.postAll);

router.post(
  "/comment",
  authMiddleware.isStaff,
  staffController.postUserComment
);

router.get("/complete", authMiddleware.isStaff, staffController.getComplete);

module.exports = router;
