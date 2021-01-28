module.exports = {
    postItem(req,res,next){
        const {name, price, description} = req.body;
        if(!name || !price || !description)
            return res.status(400).send({error: "Please fill all values"})

        next();
    },
    getItem(req,res,next){
        const itemId = req.params.itemId;
        if (!itemId)
            return res.status(400).send({error: "Please provide params id"})
        if(typeof itemId != Number)
            return res.status(400).send({error: "Please provide params id"})

        next();
    }


}