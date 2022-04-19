const bcryptjs = require("bcryptjs")
const Registered = require("./Register");

class Login {
  constructor(body) {
    this.body = body;
    this.Registered = Registered;
    this.errors = []
  }
  async login() {
    const user = await this.Registered.findOne({ user: this.body.user });
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
