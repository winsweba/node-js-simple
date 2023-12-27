require("dotenv").config()
require("express-async-errors")
// Async Error
const express = require('express')
const app = express()

const connect = require("./db/connection")
const productRouter = require('./routes/project')

const notFoundMiddleware = require('./middlewares/not-found')
const errorMiddleware = require('./middlewares/error-handler')

app.use(express.json())

app.get('/', (req, res) => {
    res.send("<h1> Store API <a href='api/v1/products'>product route</a></h1>")
})

app.use('/api/v1/products',productRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)



const start = async () => {
try {
    
    await connect(process.env.MONGOOSE_URI)
    const PORT = 3000
    app.listen(PORT, () => console.log(`Listen on port ${PORT}...`))
} catch (error) {
    console.log(error)
}
} 

start()