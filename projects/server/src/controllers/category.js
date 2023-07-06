const db = require("../../models")

const createCategory = async (req, res) => {
    const { name,} = req.body;
    console.log (req.body )
    try {
        const newCategory = await db.Category.create({
            name,
        });
        res.status(201).send({
            message: "success create Category",
            data: newCategory
        });
    } catch (error) {
        res.status(500).send({
            message:"fatal error on server",
            error,
        });     
    } 
};

const getAllCategories = async (req, res) => {
    try {
        const results = await db.Category.findAll();
        res.status(200).send({
            message: "success get all Categories",
            data: results,
        });
    } catch (error) {
        res.status(500).send({
            message: "fatal error on server",
            error,
        });    
    }
};

const updateCategory = async (req, res) => {
    const {id} = req.params;
    const {name} = req.body
    console.log(id)     
    console.log(name)
    try {
        const results = await db.Category.update({name: name}, {
            where: {    
                id: Number(id),
            },
        });
        if (!results) {
            return res.status (404).send ({
                message:"category is not found",
            });
        }
        
        res.send ({
            message:"update Category success",
            data: req.body
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"fatal error on server",
            error,
        });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
}