const mongoose = require('mongoose')


const uri = async(uri) => {
   return await mongoose.connect(uri)
}


module.exports = uri
