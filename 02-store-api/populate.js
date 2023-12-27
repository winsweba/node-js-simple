require('dotenv').config()

const Product = require('./model/product')
const connectDB = require('./db/connection')
const jsonProduct = require('./product.json')


const start = async () => {
    try {
        await connectDB(process.env.MONGOOSE_URI)
        await Product.deleteMany()
        await Product.create(jsonProduct)
        console.log("Good")
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
} 

start()