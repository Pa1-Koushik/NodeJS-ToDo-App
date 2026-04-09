import express from 'express';
import { createTodo, getallTodos } from '../controllers/todo.controller.js'

const router = express.Router()

// Routes
router.get('/todo', (req, res) => {
    res.send('Get all ToDos from database')
})

//Create ToDo
router.post('/add', createTodo)

router.get('/all', getallTodos)



export default router 