require('dotenv').config()
require("express-async-errors")

const express = require('express')
const app = express()

const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

const routers = require("./routers/main")

app.use(express.json())


app.use('/api/v1', routers)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const PORT = process.env.PORT || 3000

const start =() =>{
try {
    app.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`) )
} catch (error) {
    console.log(error)
}
}

start()