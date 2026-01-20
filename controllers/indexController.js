const db = require('../db/queries');
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const { navLinks } = require('../data');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.checkUserByUsername(username);

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.checkUserById(id);
    done(null, user);
  } catch(err) {
    done(err);
  }
});

// GET HOMEPAGE
const getHomepage = (req, res) => {
  res.render('index', {
    user: req.user,
    title: 'Authentication Practice',
    navLinks,
    errors: null
  });
};

// GET SIGN UP
const getSignUpForm = (req, res) => {
  res.render('sign-up-form', {
    title: 'Sign up Form',
    navLinks,
    errors: null
  });
};

// POST SIGN UP 
const postSignUpForm = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.registerUser(req.body.username, hashedPassword);
    res.redirect("/");
  } catch(err) {
    return next(err);
  }
};

// POST LOG IN 
const postLogInForm = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/"
});

// GET LOG OUT
const getLogOutForm = async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

module.exports = {
  getHomepage,
  getSignUpForm,
  postSignUpForm,
  postLogInForm,
  getLogOutForm
};