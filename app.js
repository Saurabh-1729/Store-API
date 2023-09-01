const express = require('express');
const app = express();

require('dotenv').config() // to require the files in the .env files
// aynsc errors
require('express-async-errors') // we dont need to setup out own middleware

const notFoundMiddleware = require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')

const connectDB = require('./db/connect')
// importing routes
const products = require('./routes/products')


// middleware
app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.send('<h1> Store API</h1><a href="/api/v1/products"> products route</a>')
})

app.use('/api/v1/products', products);

// product routes
app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        // connectDB
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is listening port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();

//4:39


