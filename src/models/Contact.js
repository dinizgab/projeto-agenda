const { default: mongoose } = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String },
  email: { type: String },
  created: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model("Contacts", ContactSchema);

class Contact {
  constructor(body) {
    this.body = body;
    this.contact = null;
    this.errors = [];
  }

  async register() {
    this.validate();
    if (this.errors.length > 0) return;

    this.contact = await ContactModel.create(this.body);
  }

  validate() {
    this.cleanUp();
    if (!validator.isEmail(this.body.email))
      this.errors.push("Digite um E-mail válido");
    if (!this.body.name) this.errors.push("O nome é obrigatório");
    if (!this.body.number && !this.body.email)
      this.errors.push("Digite pelo menos um contato");
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string")  this.body[key] = "";
    }
    this.body = {
      name: this.body.name,
      number: this.body.number,
      email: this.body.email,
    };
  }
}

module.exports = Contact;
