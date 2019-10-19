exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
};

exports.isAdmin = (req, res, next) => {
  const grantedList = [
  ];

  if (req.isAuthenticated()) {
    if (grantedList.includes(req.user.id)) {
      return next();
    }
    return res.redirect("/");
  }
  res.redirect("/login");
};

exports.isStaff = (req, res, next) => {
  const grantedList = [
  ];

  if (req.isAuthenticated()) {
    if (grantedList.includes(req.user.id)) {
      return next();
    }
    return res.redirect("/");
  }
  res.redirect("/login");
};
