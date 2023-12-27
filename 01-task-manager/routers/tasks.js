const express = require("express")

const router  = express.Router()

const {getAllTask, createTask, updateTask, deleteTask,getTask} = require("../controllers/tasks")

// router.get('/', getAllTasks)

router.route('/').get(getAllTask).post(createTask)
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router