const User = require('../Model/User')
module.exports = {
    async checkCnpj(req,res,next){
        const {email, cnpj} = req.body;
        let response;

        if(!email) return
        if(!cnpj) return

        try {
            response = await User.checkCnpjAndEmail(cnpj,email)
        } catch (error) {
            return res.json({error: error})
        }
        if(response[0].length > 0) {
            return res.json({error: "Email or Cnpj is used"})
        } 

        next();
    },
    checkUser(req,res,next){
        const userId = req.session.userId
         if(req.params.id != userId)
            return res.json({erro: "You can't manipulate data from other users"})

        next();
    },
    postUser(req,res,next){
        const {name, email, password, cnpj} = req.body;
        if(!name || !email || !password || !cnpj)
            return res.status(400).send({error: "Please fill all values"})

        next();
    },
    signIn(req,res,next){
        const {email, password, cnpj} = req.body;
        if(!password)
            return res.status(400).send({error: "Please fill all values"})
        if(!email && !cnpj)
            return res.status(400).send({error: "Please fill all values"})

        next();
    },
    getUser(req,res,next){
        const userId = req.params.id;
        if (!userId)
            return res.status(400).send({error: "Please provide params id"})
        if(typeof itemId != Number)
            return res.status(400).send({error: "Please provide params id"})

        next();
    }

}