const express = require('express')
const route = express.Router()

const home = require('./src/controllers/home')
const login = require('./src/controllers/login')
const create = require('./src/controllers/create')

// Rotas da Home
route.get('/home', home.homePage)

// Rotas da Página de login
route.get("/login", login.loginPage)

// Rotas da Página de Cadastro
route.get('/create-account', create.createAccountPage)
route.post('/create-account/register', create.register)

module.exports = route