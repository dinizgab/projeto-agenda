const express = require('express')
const route = express.Router()
const home = require('./src/controllers/home')
const contacts = require('./src/controllers/contacts')

// Rotas da Home
route.get("/", home.initial)
route.post("/", home.postForm)

// Rotas de Contato
route.get('/contacts', contacts.showContacts)

module.exports = route