require("dotenv").config();
const express = require("express");
const MySQLStore = require("express-mysql-session");
const session = require("express-session");
const passport = require("passport");
const APIrouter = require("./api/api");
const { findOrCreateUser } = require("./api/user-utility/user/functions");
const router = require("./login");
const path = require("path");
const rootPath = path.resolve(__dirname, "..");

const dbOptions = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
  createDatabaseTable: true,
};

let sessionStore = new MySQLStore(dbOptions);

var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.SITE_URL + "/login/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      //console.log(profile)
      findOrCreateUser(profile)
        .then((user) => {
          cb(null, user[0]);
        })
        .catch((err) => {
          cb(err, null);
        });
    }
  )
);

const App = express();

App.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: true,
    store: sessionStore,
  })
);

App.use(passport.initialize());
App.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

if (process.env.NODE_ENV === "development") {
  //api documentation

  const middleware = require("webpack-dev-middleware");
  const wpconfig = require("../webpack.config");
  const { webpack } = require("webpack");
  const compiler = webpack(wpconfig);
  App.use(middleware(compiler, {}));
  App.use(require("webpack-hot-middleware")(compiler));

  const swaggerAutogen = require("swagger-autogen")();
  const outputFile = "./server/swagger.json";
  const endpointsFiles = ["./server/index.js"];
  const doc = {
    info: {
      title: "CheeseHacks API",
      description:
        "Development documentation for CheeseHacks that is automatically generated on server start. See swagger-autogen for how to document endpoints when writing API calls.",
    },
    host: "localhost:3000",
    schemes: ["http"],
  };
  swaggerAutogen(outputFile, endpointsFiles, doc);

  const options = {
    explorer: true,
  };
  const swaggerUi = require("swagger-ui-express");
  const swaggerDocument = require("./swagger.json");
  App.use("/docs/", swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));
}

App.use("/api", APIrouter);
App.use("/login", router);

// App.get('/', (req, res, next) => {
//     res.send('hello world')
// })

App.get("/bundle.js", (req, res) => {
  if (process.env.NODE_ENV === "production") {
    res.sendFile(rootPath + "/dist/bundle.js");
  } else {
    res.send("uh oh");
  }
});

App.get("/logout", (req, res) => {
  req.logout((err) => {
    err ? console.log(err) : res.redirect("/");
  });
});

App.get('/home', (req, res, next) => {
  if (!req.session.passport) {
    res.redirect('/login')
  } else {
    next()
  }
})

App.get('/admin', (req, res, next) => {
  if (!req.session.passport) {
    res.redirect('/login')
  } else if (req.session.passport.user.admin === 1) {
    next()
  } else {
    res.sendStatus(403)
  }
})

App.get('/teams/bundle.js', (req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    res.sendFile(rootPath + "/dist/bundle.js");
  } else {
    res.redirect('/bundle.js')
  }
})

App.get("/*", (req, res) => {
  res.sendFile(rootPath + "/src/index.html");
});



App.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
});
