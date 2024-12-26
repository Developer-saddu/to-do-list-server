const express = require("express");
const {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const router = express.Router();

router.post("/task/create", createTask);
router.get("/task/all", getAllTasks);
router.put("/task/update/:id", updateTask);
router.delete("/task/delete/:id", deleteTask);
module.exports = router;
