require('dotenv').config()

const {BadRequestError} = require('../error')
const jwt = require("jsonwebtoken")


const login = async (req, res) => {

    const {username, password} = req.body

    // console.log(req.body)
    if(!username || !password){
        throw new BadRequestError("You need to signup first")
    }

    const id = new Date().getDate()
    const token = jwt.sign({username, id},process.env.JWT_SECRET, {expiresIn: "30d"} )
    res.status(200).json({mgs: "User Created", token})
}

const dashboard = async (req, res) => {
    console.log(req.user)
    const luckyNumber = Math.floor(Math.random() * 100)

    res.status(200).json({mgs:`Hey ${req.user.username}`, secret: `Here is your authorization data, your lucky number is ${luckyNumber}`})

 
}

module.exports = {login, dashboard}