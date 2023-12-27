require('dotenv').config()
require('express-async-errors')

// extra security package
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')


const express = require('express')
const app = express()

//  connectDB
const connectDB = require('./db/connect')

const authenticateUser = require('./middleware/authentication')

// routers
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/jobs')
 
// Error handle
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())
//  Extra packages

// app.set('trust proxy', 1)

app.use(rateLimiter(
    {
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
        // standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
        // legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
        // store: ... , // Use an external store for consistency across multiple server instances.
    }
))
app.use(helmet())
app.use(cors())
app.use(xss())
// app.use(rateL())

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authenticateUser, jobsRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await  connectDB(process.env.MONGOOSE_URI)
        app.listen(port, () => console.log(`Server is listen on port ${port}...`))
    } catch (error) {
       console.log(error) 
    }
}

start()