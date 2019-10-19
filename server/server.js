require("./config/config"); // to import configuration

// Import from NodeJS
const path = require("path");
const fs = require("fs");

// Import from External Packages
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const express = require("express");
const hbs = require("hbs");
const helmet = require("helmet");
const session = require("express-session");
const cron = require("node-cron");

const knex = require("./db/knex");
const passport = require("./auth/passport"); // import passport configuration
const database = require("./utils/database");
const KnexSessionStore = require("connect-session-knex")(session);
const store = new KnexSessionStore({
  knex: knex,
  tablename: "sessions"
});

const app = express();

// Schedule Jobs
cron.schedule("0 0 0 * * *", async () => {
  let countAll = await database.countUsers(false);
  let countCompleted = await database.countUsers(true);
  fs.appendFile(
    __dirname + "/files/count.log",
    `${new Date()} ALL ${countAll[0]["count(*)"]} - COMPLETED ${
      countCompleted[0]["count(*)"]
    }${require("os").EOL}`,
    err => {
      if (err) console.error("ERROR: Schedule Jobs: " + err);
      console.log(
        `Data was append to file: ${new Date()} ALL ${
          countAll[0]["count(*)"]
        } - COMPLETED ${countCompleted[0]["count(*)"]}`
      );
    }
  );
});

// Specify paths
const publicPath = path.join(__dirname + "/../public");
const viewPath = path.join(publicPath + "/views");
const partialsPath = path.join(viewPath + "/partials");

// Middlewares

hbs.registerHelper("eq", function() {
  const args = Array.prototype.slice.call(arguments, 0, -1);
  return args.every(function(expression) {
    return args[0] === expression;
  });
});

hbs.registerHelper("ifeq", function(a, b, options) {
  if (a == b) {
    return options.fn(this);
  }
  return options.inverse(this);
});

hbs.registerHelper("ifnoteq", function(a, b, options) {
  if (a != b) {
    return options.fn(this);
  }
  return options.inverse(this);
});

hbs.registerPartials(partialsPath); // to register partials to handlebars
app.set("view engine", "hbs"); // to specify view engine to use handlebars
app.set("views", viewPath); // to specify view folder to complie by handlebars
app.use(express.static(publicPath)); // to add static files routes
app.use(bodyParser.json()); // to enable body parser for each request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "jpc-xv-S92xa",
    resave: true,
    saveUninitialized: false,
    store: store
  })
); // to enable session
app.use(passport.initialize());
app.use(passport.session());
app.use(helmet()); // to protect application
app.use(compression()); // to compress application

app.disable("x-powered-by"); // to disable some header

// Import routes
const routes = require("./routes/routes");
const api = require("./routes/api");
const test = require("./routes/test");
const admin = require("./routes/admin");

// Routes
app.use("", routes);
app.use("/api", api);
if (process.env.NODE_ENV != "production") app.use("/test", test);
app.use("/admin", admin);

app.get("*", (req, res) => res.redirect("/")); // to handle 404 routes

app.listen(process.env.PORT, () =>
  console.log(
    `Server is up on port ${process.env.PORT}: < http://localhost:${
      process.env.PORT
    } >`
  )
);
