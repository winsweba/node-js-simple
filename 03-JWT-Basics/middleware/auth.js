const {UnauthorizationError} = require('../error')
const jwt = require("jsonwebtoken")

const authorizationMiddleware = (req, res, next) => {
     // console.log(req.headers)
     const authHeader = req.headers.authorization

     if(!authHeader || !authHeader.startsWith("Bearer ")){
         throw new UnauthorizationError("No Token given...",)
     }
     const token = authHeader.split(" ")[1]
     // console.log(token)
    // console.log(req.headers.authorization)
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        // console.log(decode)
        const {id, username} = decode
        req.user = {id, username}
        next()
    } catch (error) {
        throw new UnauthorizationError('authorization is needed for this route',)
    }
    
}

module.exports =  authorizationMiddleware