import Todo from '../models/todo.model.js'
import mongoose from 'mongoose'

//Create TODO POST 

export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body

        // Validation
        if (!title || title.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Title is required and cannot be empty'
            })
        }

        //post
        const todo = await Todo.create({
            title,
            description
        })
        return res.status(201).json({
            success: true,
            message: 'ToDo created successfully',
            todo
        })


    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

// GET all TODOs 

export const getallTodos = async (req, res) => {
    try {
        //query params 
        const { search, page = 1, limit = 10, sort } = req.query

        //base query
        let query = {}

        //search by title 

        if (search) {
            query.title = { $regex: search, $options: 'i' }
        }
        //sorting 
        let sortOption = {}
        if (sort === 'asc') sortOption.creditedAt = 1
        // else if (sort === 'desc') sortOption.creditedAt = -1
        else if (sort === 'desc') sortOption.createdAt = -1;

        //pagination
        const skip = (page - 1) * limit

        const todos = await Todo.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit))

        const totaltodos = await Todo.countDocuments(query)

        return res.status(200).json({
            success: true,
            message: 'ToDos retrieved successfully',
            page: Number(page),
            limit: Number(limit),
            total: totaltodos,
            todos
        })




    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

// GET TODO by ID

export const getTodoById = async (req, res) => {
    try {
        const { id } = req.params

        //validate id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid TODO ID'
            })
        }
        const todo = await Todo.findById(id)

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'ToDo not found'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'ToDo retrieved successfully',
            todo
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }
}

// Update TODO by ID

export const updateTodoById = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description } = req.body

        //validate id 
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid TODO ID'
            })
        }
        // validate input 
        if (!title || title.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Title and description cannot be empty'
            })
        }
        // update todo
        const todo = await Todo.findByIdAndUpdate(id, {
            title,
            description,
        }, { new: true })

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: 'ToDo not found'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'ToDo updated successfully',
            todo
        })


    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }

}
