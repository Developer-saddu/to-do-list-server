const express = require("express");
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require("../controllers/taskController");
const router = express.Router();

router.post("/task/create", createTask);
router.get("/task/all", getAllTasks);
router.get("/task/byId/:id", getTaskById);
router.put("/task/update/:id", updateTask);
router.delete("/task/delete/:id", deleteTask);
module.exports = router;
