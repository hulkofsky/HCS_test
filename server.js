const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const port = 5000
const cors = require('cors')
const db = require('./config/database')
const mongoose = require('mongoose')

mongoose.connect(db.url, { useNewUrlParser: true }, (err)=>{
    err ? console.log(`Mongo connection error: ${err}`) :
        console.log('Mongo connected!')
})

//routes
const authRouter = require('./routes/authRoutes')
const taskRouter = require('./routes/taskRoutes')

//morgan init
app.use(morgan('dev'))

app.use(cors())

//bodyparser init
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.json({limit: '50mb', extended: true}))

//using routes
app.use('/', authRouter)
app.use('/', taskRouter)


app.get('*', (req,res)=>{
    res.status(404).send('404. Page not found.')
})
  

app.listen(port, err=>{
    err?console.log('Oo oops! Something went wrong!'):
        console.log(`Http server is running on ${port}`)
})