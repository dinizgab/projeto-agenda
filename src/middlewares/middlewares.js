exports.globalVariables = (req, res, next) => {
  res.locals.errors = req.flash("errors");
  res.locals.logedUser = req.session.logedUser;
  next();
};

exports.checkCSRFError = (err, req, res, next) => {
  if (err && err.code === "EBADCSRFTOKEN") {
    return res.send("erro");
  }
  next();
};

exports.CSRFMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};
