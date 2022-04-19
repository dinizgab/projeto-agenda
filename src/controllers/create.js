const Register = require("../models/Register");

exports.createAccountPage = (req, res) => {
  res.render("index", { page: "create-account" });
};

exports.register = async (req, res) => {
  try {
    const user = new Register();
    await user.register();

    if (user.errors.length > 0) {
      req.flash("errors", user.errors);

      req.session.save(() => {
        return res.redirect("back");
      });
      return;
    }
    res.redirect("/home")

  } catch (e) {
    console.log(e);
  }
};
