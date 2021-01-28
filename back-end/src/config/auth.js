const jwt = require('jsonwebtoken')
module.exports = {
    decodeToken: (token) => {
        return jwt.verify(token, process.env.API_SECRET);
    },

    authorize: (req, res, next) => {
        const token = req.headers['token'];

        if (!token) {
            res.status(401).json({ error: 'Denied Acess' });
        }
        else {
            jwt.verify(token, process.env.API_SECRET, (error, decoded) => {
                if (error) {
                    res.status(401).json({ error: 'Invalid token.' });
                }
                else {
                    next();
                }
            });
        }
    },
}