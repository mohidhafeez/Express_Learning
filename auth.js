const passport = require("passport");
const localStratgy = require("passport-local").Strategy;
const person = require("./models/person");

passport.use(
  new localStratgy(async (username, password, done) => {
    try {
      console.log("creds received", username, password);
      const user = await person.findOne({ username: username });
      if (!user) return done(null, false, { message: "incorrect username" });

      const isPasswordMatched = user.password === password ? true : false;
      if (isPasswordMatched) {
        return done(null, user);
      } else {
        return done(null, false, { message: "incorrect password" });
      }
    } catch (e) {
      return done(e);
      console.log(e);
    }
  })
);

module.exports = passport;
