const Contact = require("../models/Contact");

exports.homePage = async (req, res) => {
  const contacts = await Contact.showContacts();

  res.render("index", { page: "home", contacts });
};
