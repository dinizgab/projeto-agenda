const bcryptjs = require("bcryptjs")
const { RegisterModel } = require("./Register");

class Login {
  constructor(body) {
    this.body = body;
    this.RegisterModel = RegisterModel;
    this.errors = []
  }
  async login() {
    const user = await this.RegisterModel.findOne({ user: this.body.user });
    if (!user) {
      this.errors.push("Usuário inválido");
      return;
    }
    if (!bcryptjs.compareSync(this.body.password, user.password)) {
      this.errors.push("Senha inválida");
      return;
    }
  }
}

module.exports = Login;
