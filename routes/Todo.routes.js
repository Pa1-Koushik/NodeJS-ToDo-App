import express from 'express';
import { createTodo, getallTodos, getTodoById, updateTodoById } from '../controllers/todo.controller.js'

const router = express.Router()

// Routes
router.get('/todo', (req, res) => {
    res.send('Get all ToDos from database')
})

//Create ToDo
router.post('/add', createTodo)

router.get('/all', getallTodos)

router.get('/:id', getTodoById)

router.put('/:id', updateTodoById)



export default router 