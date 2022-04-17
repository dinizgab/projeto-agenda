require("dotenv").config();
const express = require("express");
const app = express();

// Conectando à base de dados
const mongoose = require("mongoose");
mongoose
  .connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Garantindo que o servidor só será lançado quando a ele estiver conectado à base de dados
    app.emit("Connected to DB");
  })
  .catch((e) => console.log(e));

const routes = require("./routes");
const path = require("path");
const helmet = require("helmet")
const csrf = require('csurf')

// Middlewares
const { checkCSRFError, CSRFMiddleware } = require('./src/middlewares/middlewares')

// Configurações da sessão
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const session = require("express-session");
const sessionOptions = session({
  secret: "asdkljfqoiwefjkqwklfklads",
  store: new MongoStore({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    // Configuração dos cookies
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
  },
});
// app.use(helmet)
app.use(sessionOptions);
app.use(flash());

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Setando a pasta de arquivos estáticos e views
app.use(express.static(path.resolve(__dirname, "public")));
app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");

// Setando o arquivo de rotas e CSRF
app.use(routes);
app.use(csrf())
app.use(checkCSRFError)
app.use(CSRFMiddleware)

// Só irá rodar quando a aplicação fazer a conexão com o BD
app.on("Connected to DB", () => {
  // O app vai ficar escutando na porta 3000 e atualizando conforme mudanças nela
  app.listen(3000, () => {
    console.log("http://localhost:3000");
  });
});
