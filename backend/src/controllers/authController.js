const db = require("../config/database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require("../config/passport")
//*****Login*******//
exports.login = async (req, res) => {


    try {
        const { email, password } = req.body;
        db.get('SELECT * FROM accounts WHERE email = ? ', [email], async (err, row) => {

            if (err) {
                res.status(500).json({ success: false, error: err.message });
                return;
            }
            if (!row) {

                res.status(400).json({ success: false, error: 'No User Found with this email' });
                return;
            }

            const checkPassword = await bcrypt.compare(password, row.password);
            if (!checkPassword) return res.status(400).json({ success: false, error: "Wrong Credentials" })

            const generateToken = jwt.sign({ id: row.AccountId, data: row }, process.env.SECRET, { expiresIn: '1h' });

            return res.status(200).json({
                success: true,
                message: "Login Successfull!",
                data: { ...row, password: undefined },
                token: generateToken
            })

        })

    } catch (error) {
        return res.status(500).json({ success: false, error: error });
    }
}


//****GoogleAuthentication*******//
exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

// Google authentication callback
exports.googleAuthCallback = (req, res, next) => {
    passport.authenticate('google', { failureRedirect: '/login' }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).json({ success: false, error: "Authentication Failed!" })
        }
        const userProfile = {
            id: user.id,
            email: user.emails[0].value,
            displayName: user.displayName
        };

        const generateToken = jwt.sign({ id: user.id, profile: userProfile }, process.env.SECRET, { expiresIn: '1h' });
        return res.status(200).json({ success: true, generateToken, data: userProfile })

    })(req, res, next);
};
