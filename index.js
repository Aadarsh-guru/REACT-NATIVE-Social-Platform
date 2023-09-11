import ServerlessHttp from "serverless-http";
import express from "express";
import cors from 'cors'
import dotenv from "dotenv"
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js"
import Connection from "./config/dbConfig.js";
import morgan from "morgan";
dotenv.config()
const app = express()
const port = process.env.PORT || 8000;
app.use(cors())
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/post', postRoutes)
Connection()

app.get('/', (req, res) => {
    res.status(200).send('hello world')
})

// app.listen(port, () => { console.log(`server is running on port ${port}`); })

export const handler = ServerlessHttp(app);