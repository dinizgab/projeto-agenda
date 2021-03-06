const { default: mongoose } = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String },
  email: { type: String },
  created: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model("Contacts", ContactSchema);

module.exports = class Contact {
  constructor(body) {
    this.body = body;
    this.contact = null;
    this.errors = [];
  }

  static async searchForContact(id) {
    if (typeof id !== "string") return;
    const contact = await ContactModel.findById(id);
    return contact;
  }

  static async deleteContact(id) {
    if (typeof id !== "string") return;
    const contact = await ContactModel.findByIdAndDelete({ _id: id });
    return contact;
  }

  static async showContacts() {
    const contacts = await ContactModel.find().sort({ created: -1 });
    return contacts;
  }

  async register() {
    this.validate();
    if (this.errors.length > 0) return;

    this.contact = await ContactModel.create(this.body);
  }

  validate() {
    this.cleanUp();
    if (!this.body.number) this.errors.push("Digite um número de telefone");
    if (!this.body.name) this.errors.push("O nome é obrigatório");
    if (!validator.isEmail(this.body.email))
      this.errors.push("Digite um E-mail válido");
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") this.body[key] = "";
    }
    this.body = {
      name: this.body.name,
      number: this.body.number,
      email: this.body.email,
    };
  }

  async edit(id) {
    if (typeof id !== "string") return;
    this.validate();
    if (this.errors.length > 0) return;
    console.log(id);
    this.contact = await ContactModel.findByIdAndUpdate(id, this.body, {
      new: true,
    });
  }
};
