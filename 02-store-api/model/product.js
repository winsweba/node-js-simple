const mongoose = require("mongoose");

// const { Schema } = mongoose;

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name most be provided"],
},
price: {
    type: Number,
    required: [true, "product price most be provided"],
  },
  ratings: {
    type: Number,
    default: 4.5
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  featured: {
    type: Boolean,
    default:false, 
  },
  company: {
    type: String,
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      message: "{VALUE} not supported"
    }
    // enum: ["ikea", "liddy", "caressa", "marcus"]
  }
});

module.exports = mongoose.model("project", projectSchema)
