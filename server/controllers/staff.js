const database = require("../utils/database");
const date = require("../utils/date");

exports.getIndex = async (req, res) => {
  try {
    let staff = await database.findStaffById(req.user.id, null);

    if (!staff) return res.redirect("/staff/register");

    let questionNumber = staff.role - 0;

    let countUsers = await database.countCompletedUsers();
    countUsers = countUsers[0]["count(*)"];

    if (staff.current_index === countUsers)
      return res.redirect("/staff/complete");

    let user = await database.findAllUsers(["id", "answer_id"], {
      index: staff.current_index
    });
    user = user[0];
    if (!user) return res.status(500).send("User not found!");

    let citerias = [`answer${staff.role}`];
    if (staff.role === "2" || staff.role === "3")
      citerias.push("answer2_choice");

    let answer = await database.findAnswerById(user.answer_id, citerias);
    if (!answer) return res.status(500).send("Answer not found!");
    return res.render("staff", {
      pageTitle: `Junior Programmers Camp XV - Staff - Question ${questionNumber} Grading`,
      current: staff.current_index,
      all: countUsers,
      user,
      questionNumber,
      answer_choice: answer["answer2_choice"],
      answer: answer[`answer${staff.role}`]
    });
  } catch (err) {
    console.error(err);
  }
};

exports.postIndex = async (req, res) => {
  let staffId = req.user.id;
  try {
    let staff = await database.findStaffById(staffId, null);
    if (!staff) return res.status(400).send("Staff user not found!");

    let countUsers = await database.countCompletedUsers();
    countUsers = countUsers[0]["count(*)"];

    if (staff.current_index === countUsers)
      return res.status(400).send("You already completed the grading!");

    const questionNumber = staff.role - 0;
    const { user_id, score, additional_note } = req.body;
    if (score < 0 || score > 20)
      return res
        .status(400)
        .send("Score must be in range between 0 and 20 inclusive!");

    let oldScore = await database.findResultByUserId(user_id, [
      `score${questionNumber}`
    ]);
    if (!oldScore) oldScore = 0;
    else oldScore = oldScore[`score${questionNumber}`];

    await database.createOrUpdateScores(questionNumber, {
      staff_id: staffId,
      user_id,
      score,
      additional_note
    });

    let newScores = await database.findScoresByUserId(questionNumber, user_id);
    let averageNewScore =
      newScores.reduce((prev, current) => prev + current.score, 0) /
      newScores.length;

    let result = await database.findResultByUserId(user_id, ["total_score"]);
    if (!result)
      result = {
        total_score: 0
      };

    let updatedResult = {
      user_id,
      total_score: Math.round(result.total_score - oldScore + averageNewScore)
    };
    updatedResult[`score${questionNumber}`] = Math.round(averageNewScore);
    await database.createOrUpdateResult(updatedResult);

    await database.updateStaffById(staffId, {
      current_index: staff.current_index + 1
    });

    res.redirect("/staff");
  } catch (err) {
    console.error(err);
  }
};

exports.getRegister = async (req, res) => {
  let staff = await database.findStaffById(req.user.id, null);

  if (staff) return res.redirect("/staff");

  res.render("staff-register", {
    pageTitle: "Junior Programmers Camp XV - Staff - Register"
  });
};

exports.postRegister = async (req, res) => {
  const id = req.user.id;
  const { student_id, name, surname, role } = req.body;
  try {
    await database.createStaff({
      staff_id: id,
      student_id,
      name,
      surname,
      role
    });
    res.redirect("/staff");
  } catch (err) {
    console.error(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    let users = await database.findAllResults([
      "user_id",
      "total_score",
      "score1",
      "score2",
      "score3",
      "score4",
      "score5",
      "score6",
      "status",
      "additional_note"
    ]);

    const userIds = users.map(user => user.user_id);
    const userInfos = await database.findUsersByManyIds(userIds);
    users.map(user => {
      let index = userInfos.map(userInfo => userInfo.id).indexOf(user.user_id);
      return (user.info = userInfos[index]);
    });
    users.map(
      user => (user.info.birth_date = date.formatDate(user.info.birth_date))
    );
    const answerIds = users.map(user => user.info.answer_id);
    const answers = await database.findAnswersByManyIds(answerIds);
    users.map(user => {
      let index = answers.map(answer => answer.id).indexOf(user.info.answer_id);
      return (user.answer = answers[index]);
    });

    let passedUsers = users.filter(user => user.status === 1);
    passedUsers = passedUsers.sort((a, b) => b.total_score - a.total_score);

    let substitueUsers = users.filter(user => user.status === 2);
    substitueUsers = substitueUsers.sort(
      (a, b) => b.total_score - a.total_score
    );

    let rejectedUsers = users.filter(user => user.status === 3);
    rejectedUsers = rejectedUsers.sort((a, b) => b.total_score - a.total_score);

    users = users.filter(user => user.status === 0);
    users = users.sort((a, b) => b.total_score - a.total_score);
    res.render("staff-all", {
      pageTitle: `Junior Programmers Camp XV - Staff - All`,
      passedUsers,
      substitueUsers,
      rejectedUsers,
      users
    });
  } catch (err) {
    console.error(err);
  }
};

exports.postAll = async (req, res) => {
  const { user_id, status: requestStatus, additional_note } = req.body;
  let status = 0;
  switch (requestStatus) {
    case "passed":
      status = 1;
      break;
    case "substitue":
      status = 2;
      break;
    case "reject":
      status = 3;
      break;
    case "uncheck":
      status = 0;
      break;
    default:
      return res.status(400).send("Status not found!");
  }
  await database.updateResultByUserId(user_id, {
    status,
    additional_note
  });
  res.redirect("/staff/all");
};

exports.getComplete = (req, res) => {
  res.render("staff-complete", {
    pageTitle: `Junior Programmers Camp XV - Staff - Complete`
  });
};

exports.postUserComment = async (req, res) => {
  const { user_id, questionNumber } = req.body;
  const scores = await database.findScoresByUserId(questionNumber, user_id, [
    "additional_note"
  ]);
  let comments = scores.map(score =>
    score.additional_note !== "undefined" ? score.additional_note : ""
  );
  comments = comments.filter(comment => comment !== "");
  res.send(comments);
};
