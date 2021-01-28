const User = require('../Model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
module.exports = {

    async getUser(req,res){
        const userId = req.params.id;
        let response = await User.getById(userId)
        response = response[0][0];
        return res.json({User: response})
    },
    async postUser(req,res){
        let {name, email, password, cnpj} = req.body;
        password = await bcrypt.hash(password, 10)
        const data = {name,email,password,cnpj}
        try{
            await User.register(data)
        }catch(err){
            return res.json({error: err})
        }
        
        return res.json({User: "User Created"})
    },
    async signIn(req,res){
        const {email, password, cnpj} = req.body;
        let response;
        try {
            response = await User.findByEmail(email,cnpj);
        } catch (error) {
            return res.json({error: error});
        }
        let check_password = await bcrypt.compare(password, response[0][0].password);
        if(check_password == false){
            return res.json({error: "Invalid Credentials"});
        }else{
            const {id} = response[0][0];
            const token = jwt.sign({ id: id },
                process.env.API_SECRET,
                { expiresIn: 300 });
            req.session.userId = id;
            return res.status(200).send({User: "Logged Successful", token})
        }
    },
    logout(req,res){
        req.session.destroy()
        return res.status(200).send({User: "Session Destroyed"})
    }


}