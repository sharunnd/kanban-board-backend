const express = require("express")
const { BoardModel } = require("../models/board.model")
const { TaskModel } = require("../models/task.model")
const { SubTaskModel } = require("../models/subtask.model")
const postRouter = express.Router()


//post board
postRouter.post("/board",async(req,res)=>{
         
    try {
        const board = new BoardModel(req.body)
        await board.save()
        res.status(200).json({msg:"New Board has been created"})
    } catch (err) {
        res.status(400).json({error:err.message})
    }
})

//post task
postRouter.post("/task",async(req,res)=>{
         
    try {
        const task = new TaskModel(req.body)
        await task.save()
        res.status(200).json({msg:"New task has been created"})
    } catch (err) {
        res.status(400).json({error:err.message})
    }
})

//post subtask
postRouter.post("/subtask",async(req,res)=>{
         
    try {
        const subtask = new SubTaskModel(req.body)
        await subtask.save()
        res.status(200).json({msg:"New subtask has been created"})
    } catch (err) {
        res.status(400).json({error:err.message})
    }
})


postRouter.get("/get/:boardID",async(req,res)=>{
      const {boardID} = req.params  
    try {
        const board =  await BoardModel.findOne({_id:boardID})
        const task =  await TaskModel.find({boardID:boardID})
        const subtask =  await SubTaskModel.find({taskID:task[0]._id})
        
        task[0].subtask = [...subtask]
        board.tasks = [...task]
        
        res.status(200).json({msg:"Board",board})
    } catch (err) {
        console.error(err);
        res.status(400).json({error:err.message})
    }
})

//get board
postRouter.get("/get/:boardID",async(req,res)=>{
    const {boardID} = req.params  
  try {
      const board =  await BoardModel.findOne({_id:boardID})
      const task =  await TaskModel.find({boardID:boardID})
      const subtask =  await SubTaskModel.find({taskID:task[0]._id})
      
      task[0].subtask = [...subtask]
      board.tasks = [...task]
      
      res.status(200).json({msg:"List of boards",board})
  } catch (err) {
      console.error(err);
      res.status(400).json({error:err.message})
  }
})


//update board
postRouter.patch("/update/board/:boardID",async(req,res)=>{
    const {boardID} = req.params  
  try {
      await BoardModel.findByIdAndUpdate({_id:boardID},req.body)  
      res.status(200).json({msg:"Board has been updated"})
  } catch (err) {
      console.error(err);
      res.status(400).json({error:err.message})
  }
})


//update task
postRouter.patch("/update/task/:taskID",async(req,res)=>{
    const {taskID} = req.params  
  try {
      await TaskModel.findByIdAndUpdate({_id:taskID},req.body)  
      res.status(200).json({msg:"Task has been updated"})
  } catch (err) {
      console.error(err);
      res.status(400).json({error:err.message})
  }
})

//update task
postRouter.patch("/update/subtask/:subtaskID",async(req,res)=>{
    const {subtaskID} = req.params  
  try {
      await SubTaskModel.findByIdAndUpdate({_id:subtaskID},req.body)  
      res.status(200).json({msg:"subtask has been updated"})
  } catch (err) {
      console.error(err);
      res.status(400).json({error:err.message})
  }
})

//delete board
postRouter.delete("/delete/board/:boardID",async(req,res)=>{
    const {boardID} = req.params  
  try {
      await BoardModel.findByIdAndDelete({_id:boardID})  
      res.status(200).json({msg:"Board has been deleted"})
  } catch (err) {
      console.error(err);
      res.status(400).json({error:err.message})
  }
})

//delete task
postRouter.delete("/delete/task/:taskID",async(req,res)=>{
    const {taskID} = req.params  
  try {
      await TaskModel.findByIdAndDelete({_id:taskID})  
      res.status(200).json({msg:"Task has been deleted"})
  } catch (err) {
      console.error(err);
      res.status(400).json({error:err.message})
  }
})

//delete subtask
postRouter.delete("/delete/subtask/:subtaskID",async(req,res)=>{
    const {subtaskID} = req.params  
  try {
      await SubTaskModel.findByIdAndDelete({_id:subtaskID})  
      res.status(200).json({msg:"SubTask has been deleted"})
  } catch (err) {
      console.error(err);
      res.status(400).json({error:err.message})
  }
})

module.exports = {
    postRouter
}