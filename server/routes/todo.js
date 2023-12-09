const express = require("express")
const Todo = require("../models/todo")
const router = express.Router()

router

.get('/get-todo-by-userId/:userId', async (req, res) => {
  try {
    const userId = req.params.userId
    console.log(userId)
    const todos = await Todo.getTodoByUserId(userId);
    res.send(todos)
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

// login post
.post('/add-todo', async (req, res) => {
  try {
    const todo = await Todo.addTodo(req.body)
    res.send({success:"Todo added succcessfully!!!"})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

.put('/edit-todo', async (req, res) => {
  try {
    let todo = await Todo.editTodo(req.body)
    res.send(todo)
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

.delete('/delete', async (req, res) => {
  try {
    await Todo.deleteTodo(req.body)
    res.send({success:"Deleted successfully"})
  } catch(err) {
    res.status(401).send({message: err.message})
  }
})

module.exports = router;
