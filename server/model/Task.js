import mongoose from 'mongoose'


const TaskSchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true},
    day: {type: String, required : true},
   

}, {timestamps: true})



const TaskModel = mongoose.model('task', TaskSchema)

export default TaskModel