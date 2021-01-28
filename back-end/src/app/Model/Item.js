const db = require('../../config/db')

module.exports = {
    register(userId,data){
        const query = `INSERT INTO item
        (
            userId,
            name,
            description,
            price
        )
        VALUES
        (?,?,?,?)
        `;
        const values = [
            userId,
            data.name,
            data.description,
            data.price
        ];
        return db.promise().query(query,values);
    },
    getById(id, userId){
        return db.promise().query(`SELECT * FROM item where id = ${id} and userId = ${userId}`)
    },
    async findByIdAndUpdate(id,userId,data){
        const item = await db.promise().query(`SELECT * FROM item where id = ${id} and userId = ${userId}`)
        if (!item) return;
        return db.promise().query(`UPDATE item SET name = '${data.name}', description = '${data.description}', price = '${data.price}' where id = ${id} and userId = ${userId}`)
    },
    delete(id, userId){
        return db.promise().query(`DELETE FROM item where id = ${id} and userId = ${userId} LIMIT 1`)
    },
    findAll(id){
        return db.promise().query(`SELECT * FROM item where userId=${id}`)
    }
}