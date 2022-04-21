const express = require("express");
const route = express.Router();

// Controllers
const home = require("./src/controllers/home");
const login = require("./src/controllers/login");
const create = require("./src/controllers/create");

// Rotas da Home
route.get("/home", home.homePage);
route.post("/home/new-contact", home.newContact);

// Rotas da Página de login
route.get("/login", login.loginPage);
route.post("/login/login", login.login);
route.get("/login/logout", login.logout);

// Rotas da Página de Cadastro
route.get("/create-account", create.createAccountPage);
route.post("/create-account/register", create.register);

module.exports = route;
