// to populate our product.json data in our collection

require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany() // it will first delete the whole data then populate
        await Product.create(jsonProducts)
        console.log('Success!!')
        process.exit(0)
    }
    catch (error) {
        console.log(error)
    }
}

start();
