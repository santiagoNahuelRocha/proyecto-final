const Product = require('../models/product')

const validateProduct = async (req, res, next) => {
    const product = await Product.findOne({title: req.body.title})
    if(product){
        res.status(400).json({message: "El producto ya existe"})
    }else{
        next()
    }
}

module.exports = validateProduct