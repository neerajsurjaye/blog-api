const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//envvariables
let dotEnv = require('dotenv')
dotEnv.config()

//mongoose setup
const mongoose = require('mongoose')
let MONGODB = 'mongodb://127.0.0.1:27017/blog'
mongoose.connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

//routes
const postsRoute = require('./routes/postRoute')
const userRoute = require('./routes/userRoute')
const commentRoute = require('./routes/commentRoute')
const authRoute = require('./routes/authRoute')

app.use('/api/post', postsRoute)
app.use('/api/user', userRoute)
app.use('/api/comment', commentRoute)
app.use('/api/auth', authRoute)


const PORT = process.env.port || 3000
app.listen(PORT, () => {
    console.log(`Listning on ${PORT}`);
})