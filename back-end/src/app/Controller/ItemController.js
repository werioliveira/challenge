const Item = require('../Model/Item');
const { use } = require('../routes');
module.exports = {

    async postItem(req,res){
        const {name, price, description} = req.body;
        const userId = req.session.userId
        const data = {name, price, description}
        try{
            await Item.register(userId, data)
        }catch(err){
            return res.json({error: err})
        }
        
        return res.status(200).send({User: "Item Created"})
    },
    async get(req,res){
        const itemId = req.params.itemId
        const userId = req.session.userId
        let response;

        try {
            response = await Item.getById(itemId,userId)
        } catch (error) {
            return res.json({error: error})
        }
        if(response[0].length == 0)
            return res.json({erro: "Item not exist"})

        return res.status(200).send({Item: response[0]})
    },
    async showAll(req,res){
        let response;
        const userId = req.session.userId
        try {
            response = await Item.findAll(userId) 
        } catch (error) {
            return res.status(200).send({error: error})
        }
        return res.status(200).send({Items:response[0]})
    },
    async update(req,res){
        const itemId = req.params.itemId
        const userId = req.session.userId
        const {description, price, name} = req.body
        const data = {name, price,description}
        try {
            await Item.findByIdAndUpdate(itemId,userId,data)
        }catch(error){
            return res.json({error: error})
        }
        let item;
        try {
            item = await Item.getById(itemId,userId)
        } catch (error) {
            return res.json({error: error})
        }
        return res.status(200).send({Item: item[0][0]})
    },
    async delete(req,res){
        const itemId = req.params.itemId
        const userId = req.session.userId
        try {
            await Item.delete(itemId,userId)
        } catch (error) {
             return res.json({error: error})
        }
        return res.status(200).send({Item: "Deleted Item"})
    }

}