module.exports = {    
    isLogged(req, res, next) {
        const user_id = req.session.userId;
        if (!user_id) {
            return res.json({ erro: "Please Sign In First" });
        }
        next();
    }
}