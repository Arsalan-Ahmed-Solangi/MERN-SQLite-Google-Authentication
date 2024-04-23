// passport.js
const passport = require('passport');
const GoogleOAuth2Strategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleOAuth2Strategy({
    clientID: 'YOUR_GOOGLE_CLIENT_ID',
    clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET', //****AddYOURCREDENTIALS******//
    callbackURL: '/auth/google/callback'   
}, (accessToken, refreshToken, profile, done) => {

    return done(null, profile);
}));

module.exports = passport;
