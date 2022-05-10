import express from "express";
const router = express.Router()

import TaskController from '../controllers/taskController.js'




// @ /api/task/create

router.post('/create', TaskController.createTask)


// @ /api/task/get
router.get('/get', TaskController.getTask)




// @ /api/task/get
router.put('/edit/:id', TaskController.editTask)



// @ /api/task/delete
router.delete('/delete/:id', TaskController.deleteTask)



export default router