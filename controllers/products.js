const Product = require('../models/product')

const getAllProductStatic = async (req, res) => {
    // const products = await Product.find({});
    res.status(200).json({ products });
}

const getAllProduct = async (req, res) => {
    // Postman kai Query Params meh query likhte hai
    console.log(req.query)
    // const products = await Product.find(req.query)
    res.status(200).json({ products })
}

module.exports = {
    getAllProduct,
    getAllProductStatic,
}