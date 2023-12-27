const mongoose = require("mongoose")

const TasksSchema = new mongoose.Schema({
    // name:String,
    name:{
        type: String,
        required: [true, "Must provide name"],
        trim: true,
        maxlength: [20, "name can not be more the 20"]
    },
    completed: {
        type: Boolean,
        default: false,
    }
})

module.exports = mongoose.model("Task", TasksSchema)