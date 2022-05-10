import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB  from './config/db.js'
const PORT = process.env.PORT || 8000
import taskRoute from './routes/task.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:  true}))


connectDB()


app.use('/api/task', taskRoute)





app.get('/', (req,res)=>{
    res.send('Success..')
})

app.listen(PORT, ()=>{
    console.log(`Server started at port http://localhost:${PORT}`)
})

