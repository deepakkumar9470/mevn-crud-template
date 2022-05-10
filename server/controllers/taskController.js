
import TaskModel from "../model/Task.js";


class TaskContoller{
  static createTask = async(req,res) =>{

       try {
           const data = new TaskModel({
               title:  req.body.title,
               day:  req.body.day,
           })

           const savetask = await data.save()
           res.status(201).json({msg:'Task Created', task : savetask})
       } catch (error) {
        res.status(400).json({msg:'Oops failing to create task'})   
       }
        
  }

  static getTask = async(req,res) =>{

    try {
        const data = await TaskModel.find({}).sort({_id : -1})
        res.status(200).json({msg:'Task Found', task : data})
    } catch (error) {
     res.status(400).json({msg:'Oops tasks not found'})   
    }
     
}
 
static deleteTask = async(req,res) =>{

    try {
        await TaskModel.findByIdAndRemove(req.params.id)

        res.status(200).json({msg:'Task Deleted'})
    } catch (error) {
     res.status(400).json({msg:'Oops failing to delete task'})   
    }
     
}

static editTask = async(req,res) =>{

    try {
        const data = await TaskModel.findByIdAndUpdate(req.params.id, req.body)

        res.status(200).json({msg:'Task Updated success', tasks : data})
    } catch (error) {
     res.status(400).json({msg:'Oops failing to update task'})   
    }
     
}
 



    
}



export default TaskContoller