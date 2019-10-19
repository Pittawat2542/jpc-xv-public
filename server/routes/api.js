const express = require("express");

const router = express.Router();

const apiController = require("../controllers/api");
const authMiddleware = require("../middlewares/auth");

router.post("/auth/facebook", apiController.postAuthFacebook);

router.get("/auth/facebook/callback", apiController.getAuthFacebookCallback);

router.post(
  "/auth/facebook/logout",
  authMiddleware.isAuthenticated,
  apiController.postAuthFacebookLogout
);

router.get(
  "/pictures/:fileName",
  authMiddleware.isAuthenticated,
  apiController.getPicturesFileName
);

router.get(
  "/pictures/verifications/:fileName",
  authMiddleware.isAuthenticated,
  apiController.getVerificationPicturesFileName
);

router.get(
  "/documents/:fileName",
  authMiddleware.isAuthenticated,
  apiController.getDocumentsFileName
);

module.exports = router;
