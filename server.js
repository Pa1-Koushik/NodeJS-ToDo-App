import express from 'express';
import cors from 'cors';
import TodoRoutes from './routes/Todo.routes.js'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()
// console.log(express())

connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
// app.get('/', (req, res) => {
//     res.send('Building ToDo')
// })
app.use('/api', TodoRoutes)


// server
app.listen(PORT, () => {
    console.log("server is running on port", 'http://localhost:' + PORT)
})
