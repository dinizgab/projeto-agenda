const Login = require("../models/Login");

exports.loginPage = (req, res) => {
  res.render("index", { page: "login" });
};

exports.login = async (req, res) => {
  try {
    const logedUser = new Login(req.body);
    await logedUser.login();

    if (logedUser.errors.length > 0) {
      req.flash("errors", logedUser.errors);
      req.session.save(() => {
        return res.redirect("back");
      });
      return;
    }

    req.session.logedUser = logedUser.body;
    res.redirect("/home");
  } catch (e) {
    console.log(e);
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
