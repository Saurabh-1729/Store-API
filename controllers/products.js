const Product = require('../models/product')

const getAllProductStatic = async (req, res) => {
    // const search = 'table'
    const products = await Product.find({
        // name: { $regex: search, $options: 'i' }

    }).select('name price')
    res.status(200).json({ products });
}

const getAllProduct = async (req, res) => {
    // Postman kai Query Params meh query likhte hai
    // console.log(req.query)
    const { featured, name, sort, fields, company } = req.query
    const queryObject = {}
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' } // koi bhi name meh agar pattern match karega tho woh show hoga
    }
    let result = Product.find(queryObject); // it should be let const then value will not change
    // sort
    if (sort) {
        const sortList = sort.split(',').join(' '); // array ko seprate kiye arround , and join with space 
        result = result.sort(sortList); // result ko sort kiye according to sortList
    } else {
        result = result.sort('createdAt');
    }

    if (fields) {
        const fieldsList = fields.split(',').join(' '); // array ko seprate kiye arround , and join with space 
        result = result.select(fieldsList);
    }
    const products = await result
    // console.log(queryObject)
    res.status(200).json({ products, nbHits: products.length });
}

module.exports = {
    getAllProduct,
    getAllProductStatic,
}
