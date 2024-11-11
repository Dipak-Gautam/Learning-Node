const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const Person = require("./models/person");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await Person.findOne({ userName: username });

      if (!user) {
        return done(null, false, { message: "Incorrect UserName" });
      }
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch == true) {
        return done(null, user);
      } else {
        return done(null, null, { message: "Incorrect Password" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
