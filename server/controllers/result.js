const database = require("../utils/database");
const multer = require("../utils/multer-config");

const openVerificationDate = new Date(2019, 5, 23, 18);
const closeVerificationDate = new Date(2019, 5, 28, 10);

exports.getIndex = async (req, res) => {
  if (
    process.env.NODE_ENV === "production" &&
    (new Date() < openVerificationDate || new Date() > closeVerificationDate)
  )
    return res.redirect("/");

  const userId = req.user.id;
  try {
    const result = await database.findResultByUserId(userId, ["status"]);
    const user = await database.findUserById(userId, [
      "th_first_name",
      "th_last_name"
    ]);

    if (result && result.status === 1) {
      const verification = await database.findVerificationByUserId(userId);
      if (verification) return res.redirect("/result/complete");
    }

    res.render("result", {
      pageTitle: "Junior Programmers Camp XV - Result",
      result,
      user
    });
  } catch (err) {
    console.error(err);
  }
};

exports.postIndex = async (req, res) => {
  if (
    process.env.NODE_ENV === "production" &&
    (new Date() < openVerificationDate || new Date() > closeVerificationDate)
  )
    return res.sendStatus(404);

  const userId = req.user.id;

  try {
    const result = await database.findResultByUserId(userId, ["status"]);

    if (!result || result.status !== 1) return res.sendStatus(403);

    multer.uploadVerificationPicture(req, res, async err => {
      if (err) {
        res.status(400).send({
          error: err
        });
        return;
      }

      const { pickup_location, shirt_size } = req.body;
      if (!pickup_location || !shirt_size) return res.sendStatus(404);
      await database.createOrUpdateVerification({
        user_id: userId,
        pickup_location,
        shirt_size,
        verification_proof_file_name: req.file.filename
      });
      res.redirect("/result/complete");
    });
  } catch (err) {
    console.error(err);
  }
};

exports.getComplete = async (req, res) => {
  if (
    process.env.NODE_ENV === "production" &&
    (new Date() < openVerificationDate || new Date() > closeVerificationDate)
  )
    return res.redirect("/");

  const userId = req.user.id;

  try {
    const result = await database.findResultByUserId(userId, ["status"]);

    if (result && result.status === 1) {
      const verification = await database.findVerificationByUserId(userId);
      if (verification)
        return res.render("complete", {
          pageTitle: "Junior Programmers Camp XV - Complete"
        });
    }
  } catch (err) {
    console.error(err);
  }

  res.redirect("/");
};
