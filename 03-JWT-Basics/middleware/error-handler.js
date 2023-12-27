const CustomAPIError = require('../error/custom-error')
const {StatusCodes} = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomAPIError){
        return res.status(err.statusCode).json({mgs: err.message})
    }
    else{
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Something Want wrong please again")
    }
}

module.exports = errorHandlerMiddleware