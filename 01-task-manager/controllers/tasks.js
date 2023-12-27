const { request } = require("express");
const Task = require("../models/Tasks");
const asyncWrapper = require("../middleware/async");
const {createCustomError} = require('../error/custom-error')


const getAllTask = asyncWrapper(async (req, res) => {
  const task = await Task.find();
  res.status(200).json({ task });
});
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  // console.log(taskID)

  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return createCustomError(`this no task with the id of : ${taskID}`, 404)

  }
  return res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return createCustomError(`this no task with the id of : ${taskID}`, 404)
  }

  return res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return createCustomError(`this no task with the id of : ${taskID}`, 404)
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTask,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
