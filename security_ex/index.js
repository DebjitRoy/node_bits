const fs = require("fs");
const https = require("https");
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const passport = require("passport");
const cookieSession = require("cookie-session");
const { Strategy } = require("passport-google-oauth20");

require("dotenv").config();

const PORT = 3000;

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

passport.use(
  new Strategy(
    // AUTH OPTIONS
    {
      callbackURL: "/auth/google/callback",
      clientID: config.CLIENT_ID,
      clientSecret: config.CLIENT_SECRET,
    },
    // Callback function - invoked once Google successfully authenticates
    (accessToken, refreshToken, profile, done) => {
      // returns accessToken and optionally refresh token for using subsequent calls
      console.log("Profile", profile);
      done(null, profile); // null if no error. Passport knows login successful with this callback
    }
  )
);

// Save the session to the cookie. User is saved in the cookie and will be sent to the user/browser
passport.serializeUser((user, done) => {
  // here, no parsing or reading from db - just relaying user data
  const { id, displayName } = user;
  console.log("Serialize", id, displayName);
  done(null, id);
});

// Reads user data of session from cookie. Adds data to express mw so we can read req.user
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

const app = express();

app.use(helmet());
app.use(
  cookieSession({
    name: "session",
    maxAge: 24 * 60 * 60 * 1000,
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2], // server secret keys to sign browser cookie
  })
);
app.use(passport.initialize());
app.use(passport.session());

// MW for Authentication with OAuth
const checkLoggedIn = (req, res, next) => {
  // session automatically adds req.user with oauth user information
  console.log("user", req.user); // userId passed in the serializeUser
  const isLoggedIn = req.user;
  if (!isLoggedIn) {
    res.status(401).json({
      error: "login required",
    });
  }
  next();
};
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// endpoint to go google oAuth ftom browser
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

// endpoint to send authorization code to web app from Google
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: true,
  }),
  (req, res) => {
    console.log("Google callback succesful");
    // res.redirect();
  }
);
// use middleware to individual route instead of using app.use(). We can send multiple mw as well
app.get("/secret", checkLoggedIn, (req, res) => {
  return res.send("Secret value 42");
});
// common logout
app.get("/auth/logout", (req, res) => {});

app.get("/failure", (req, res) => {
  return res.send("Failed to log in");
});

// Command to create private key and self-signed certificate >
// openssl req -x509 -newKey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365

const server = https.createServer(
  {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  },
  app
);
server.listen(PORT, () => {
  console.log(`listening on ${PORT}...`);
});
