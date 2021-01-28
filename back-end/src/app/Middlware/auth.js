const jwt = require('jsonwebtoken');
const configJwt = require('../../config/auth')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.json({
            error: [
                "You need login to proceed."
            ]
        });
    }

    jwt.verify(authHeader, process.env.API_SECRET, (err, decoded) => {
        if(err){
            return res.json({
                error: [
                    "You need login to proceed."
                ]
            });
        }

        req.userId = decoded.id;

        return next();
    })
}