require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const userRoute = require('./routes/user')
const loginRoute = require('./routes/login')
const userInfoRoute = require('./routes/information')


//DataBase connection
require('./db')

//Middlewares
app.use(express.json())
app.use(cors())

//Routes
app.use('/api/register', userRoute)
app.use('/api/login', loginRoute)
app.use('/api/user', userInfoRoute)



//Server Lunch
const port = process.env.PORT || 3001
app.listen(port, ()=> console.log(`Server running on port ${port}`))