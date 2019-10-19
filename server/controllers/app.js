exports.getIndex = (req, res) => {
  res.render("index", {
    pageTitle: "Junior Programmers Camp XV",
    GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY
  });
};

exports.getLogin = (req, res) => {
  res.render("login", {
    pageTitle: "Junior Programmers Camp XV - Login"
  });
};
