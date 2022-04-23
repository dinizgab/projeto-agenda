const Contact = require("../models/Contact");

exports.homePage = (req, res) => {
  res.render("index", { page: "home" });
};

exports.newContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.register();

    if (contact.errors.length > 0) {
      req.flash("errors", contact.errors);

      req.session.save(() => {
        return res.redirect("/home#");
      });
      return;
    }
    res.redirect("/home");

  } catch (e) {
    console.log(e);
  }
};
