const {CustomAPIError} = require('../error/custom-error')

const errorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg: err.message})
    }
    return res.status(500).json({msg: 'something went bad please try again'})
}

module.exports = errorHandlerMiddleware