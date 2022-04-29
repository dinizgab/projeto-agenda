const Contact = require("../models/Contact");

exports.createContact = (req, res) => {
  res.render("index", { page: "create-contact", contact: {} });
};

exports.registerNewContact = async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.register();

    if (contact.errors.length > 0) {
      req.flash("errors", contact.errors);
      req.session.save(() => {
        return res.redirect("back");
      });
      return;
    }
    res.redirect("/home");
  } catch (e) {
    console.log(e);
  }
};

exports.editIndex = async (req, res) => {
  if (!req.params.id) return res.send("404");
  const contact = await Contact.searchForContact(req.params.id);

  if (!contact) return res.send("404");
  res.render("index", { page: "edit-contact", contact });
};

exports.registerEdition = async (req, res) => {
  try {
    if (!req.params.id) return res.send("404");
    const contact = new Contact(req.body);
    await contact.edit(req.params.id);

    if (contact.errors.length > 0) {
      req.flash("errors", contact.errors);
      req.session.save(() => {
        return res.redirect("back");
      });
      return;
    }
    res.redirect("/home");
  } catch (e) {
    console.log(e);
  }
};

exports.delete = async (req, res) => {
  if(!req.params.id) return
  const contact = await Contact.deleteContact(req.params.id)

  if(!contact) return res.send('404')
  res.redirect("back")
}
