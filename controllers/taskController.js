const databases = require("../config/database/databases");

const createTask = async (req, res) => {
  try {
    const inputData = req.body;
    let taskInfo = await databases.tasks.create({
      taskName: inputData.task,
      dueDate: inputData.dueDate,
      remark: inputData.remark,
    });
    if (taskInfo) {
      return res.status(201).json({
        success: true,
        message: "Task created successfully",
      });
    }
    return res.status(400).json({
      success: false,
      message: "Failed to create task",
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await databases.tasks.findByPk(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await databases.tasks.findAll();
    if (!tasks) {
      return res.status(404).json({
        success: false,
        message: "No tasks found",
      });
    }
    return res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.log(error);

    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const inputData = req.body;

    const task = await databases.tasks.findByPk(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const updatedTask = await task.update({
      taskName: inputData.taskName,
      dueDate: inputData.dueDate,
      reamrk: inputData.reamrk,
    });

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await databases.tasks.findByPk(id);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await task.destroy();

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTaskById,
  getAllTasks,
  updateTask,
  deleteTask,
};
