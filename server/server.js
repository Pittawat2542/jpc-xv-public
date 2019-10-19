require("./config/config");

const path = require("path");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const express = require("express");
const helmet = require("helmet");
const session = require("express-session");

const knex = require("./db/knex");
const passport = require("./auth/passport");
const KnexSessionStore = require("connect-session-knex")(session);

const adminRoutes = require("./routes/admin");
const apiRoutes = require("./routes/api");
const appRoutes = require("./routes/app");
const resultRoutes = require("./routes/result");
const staffRoutes = require("./routes/staff");

const errorsController = require("./controllers/errors");

const app = express();
const store = new KnexSessionStore({
  knex: knex,
  tablename: "sessions"
});

const publicPath = path.join(__dirname + "/../public");
const viewPath = path.join(publicPath + "/views");

app.set("view engine", "ejs");
app.set("views", viewPath);
app.use(express.static(publicPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "jpc-xv-S92xa",
    resave: true,
    saveUninitialized: false,
    store: store
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet());
app.use(compression());

app.disable("x-powered-by");

app.use("", appRoutes);
app.use("/admin", adminRoutes);
app.use("/api", apiRoutes);
app.use("/staff", staffRoutes);
app.use("/result", resultRoutes);

app.use(errorsController.get404);

app.listen(process.env.PORT, () => {
  if (process.env.NODE_ENV !== "production")
    console.log(`Server is up on http://localhost:${process.env.PORT}`);
});
