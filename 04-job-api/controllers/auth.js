const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const bcrypt = require("bcryptjs");
const jwt =require('jsonwebtoken')

const register = async (req, res) => {
  // const {name, email, password}  = req.body

  // const salt = await bcrypt.genSalt(10)
  // const hashedPassword = await bcrypt.hash(password, salt)

  // const tempUser = {name, email, password: hashedPassword}

  // const user = await User.create({...tempUser})

  // if(!name ||  !email || !password) {
  //     throw new BadRequestError('please provide name, email, password')
  // }

  const user = await User.create({ ...req.body });
  // const token = jwt.sign({userId: user._id, name: user.name}, 'jwtSc', {expiresIn: '30d', })
  const token = user.createJwt();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};
const login = async(req, res) => {
  const {email, password} = req.body

  if(!email || !password){
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({email})

  if(!user){
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const IsPasswordCorrect = await user.comparePassword(password)
  if(!IsPasswordCorrect){
    throw new UnauthenticatedError('Invalid Credentials')
  }  
  const token = user.createJwt()
  res.status(StatusCodes.OK).json({user: {name: user.name}, token})
}

module.exports = {
  register,
  login,
};
