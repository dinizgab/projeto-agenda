const validator = require('validator')
const bcryptjs = require('bcryptjs')
const { default: mongoose } = require("mongoose");

const RegisterSchema = new mongoose.Schema({
  user: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const RegisterModel = mongoose.model("Register", RegisterSchema);

class Register {
  constructor(body) {
    this.body = body;
    this.confirm = this.body.confirm
    this.registeredUser = null;
    this.errors = [];
  }

  async register() {
    this.validate();
    await this.userExists()

    if(this.errors.length > 0) return

    this.hashPassword()
    this.registeredUser = await RegisterModel.create(this.body)
  }

  validate() {
    // Validação dos dados
    this.cleanUp();

    if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')
    if(this.body.user.length < 10) this.errors.push('O usuário deve ter no mínimo 10 caracteres')
    if(8 > this.body.password.length || this.body.password.length > 15) this.errors.push('A senha deve ter entre 8 e 15 caracteres')
    if(this.body.password !== this.confirm) this.errors.push('As senhas devem ser idênticas')
  }

  cleanUp() {
    // Limpeza dos dados
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") this.body[key] = "";
    }

    this.body = {
      email: this.body.email,
      user: this.body.user,
      password: this.body.password,
    };
  }

  hashPassword() {
    // Fazendo um hash da senha
    const salt = bcryptjs.genSaltSync()
    this.body.password = bcryptjs.hashSync(this.body.password, salt)
  }

  async userExists() {
    const user = await RegisterModel.findOne({ user: this.body.user })
    const email = await RegisterModel.findOne({ email: this.body.email })

    if(user) this.errors.push('O usuário já está cadastrado')
    if(email) this.errors.push('O E-mail já está cadastrado')
  }
}

module.exports = Register;
module.exports = RegisterModel
