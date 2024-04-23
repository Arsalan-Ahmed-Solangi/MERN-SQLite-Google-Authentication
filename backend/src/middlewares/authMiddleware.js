const jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {


    const token = req.headers['authorization'] && req.headers['authorization'].split(" ")[1];
    if (!token) {

        return res.status(401).json({
            success: false,
            message: "Authorization Token Not Found!"
        });
    }

    jwt.verify(token, process.env.SECRET, (err, user) => {

        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: 'Token has expired. Please log in again.'
                });
            }
            return res.status(403).json({
                success: false,
                message: "Token & Secret Key Not Matched!"
            });
        }

        req.user = user;
        next();
    });

}


module.exports = authMiddleware;