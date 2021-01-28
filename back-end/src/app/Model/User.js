const db = require('../../config/db');

module.exports = {
    register(data){
        const query = `INSERT INTO user
        (
            name,
            email,
            cnpj,
            password
        )
        VALUES
        (?,?,?,?)
        `;
        const values = [
            data.name,
            data.email,
            data.cnpj,
            data.password
        ];
        return db.promise().query(query,values);
    },
    getById(id){
        return db.promise().query(`SELECT * FROM user where id = ${id}`)
    },
    findByEmail(user_email, user_cnpj) {
        return db.promise().query(`SELECT * FROM user WHERE email = '${user_email}' or cnpj = '${user_cnpj}'`);
    },
    checkCnpjAndEmail(cnpj, email){
        return db.promise().query(`SELECT * FROM user where email = '${email}' or cnpj = ${cnpj}`)
    }
}