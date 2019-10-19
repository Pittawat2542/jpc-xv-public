const express = require("express");

const router = express.Router();

const adminController = require("../controllers/admin");
const authMiddleware = require("../middlewares/auth");

// router.get("/activate", authMiddleware.isAdmin, adminController.getActivate);

router.get("/users", authMiddleware.isAdmin, adminController.getUsers);

router.get("/staffs", authMiddleware.isAdmin, adminController.getStaffs);

router.post(
  "/staffs/verification",
  authMiddleware.isAdmin,
  adminController.postStaffsVerification
);

router.post(
  "/search/user",
  authMiddleware.isAdmin,
  adminController.postSeachUser
);

router.post(
  "/search/answer",
  authMiddleware.isAdmin,
  adminController.postSearchAnswer
);

router.post(
  "/search/user/all",
  authMiddleware.isAdmin,
  adminController.postSearchAllUsers
);

router.post(
  "/search/user/all/completed",
  authMiddleware.isAdmin,
  adminController.postSearchAllCompletedUsers
);

router.post(
  "/search/answer/all",
  authMiddleware.isAdmin,
  adminController.postSearchAllAnswers
);

router.post(
  "/edit/picture",
  authMiddleware.isAdmin,
  adminController.postEditPicture
);

router.post(
  "/edit/document",
  authMiddleware.isAdmin,
  adminController.postEditDocument
);

router.post(
  "/calculate-score",
  authMiddleware.isAdmin,
  adminController.postCalculateScore
);

router.post(
  "/edit/verification",
  authMiddleware.isAdmin,
  adminController.postEditVerification
);

module.exports = router;
