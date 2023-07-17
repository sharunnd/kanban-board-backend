const mongoose = require("mongoose")

const subtaskSchema = mongoose.Schema({
    title : String,
	isCompleted : Boolean,
    taskID:String
},{
    versionKey: false
})

const SubTaskModel = mongoose.model("subtask",subtaskSchema)

module.exports =  {
    SubTaskModel
}