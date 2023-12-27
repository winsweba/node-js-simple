const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    return res.status(500).json({mg: "something went wrong, please try again "})
}

module.exports = errorHandlerMiddleware