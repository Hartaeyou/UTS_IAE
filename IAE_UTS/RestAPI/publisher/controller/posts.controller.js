const pool = require('../db/database');
const postsController = {

    getAll: async (req , res) =>{
        try{
            const [rows, fields] = await pool.query("SELECT * FROM Animal")
            res.json({
                data: rows
            })
        }
        catch(err){
            console.log(err);
        }

    },
    create: async (req , res) =>{
        try{
            const {animal_name, animal_age, animal_weight, animal_gender} = req.body
            const sql = "INSERT INTO Animal (animal_name, animal_age, animal_weight, animal_gender) VALUES (?,?,?,?)";
            const [rows, fields] = await pool.query(sql, [animal_name, animal_age, animal_weight, animal_gender])
            res.json({
                data: rows
            })
        }
        catch(err){
            console.log(err);
        }
    }

}


module.exports = postsController