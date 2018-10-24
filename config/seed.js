const Task = require('../models/task')
const User = require('../models/user')
const mongoose = require('mongoose')
const users = require('./tables/users')
const tasks = require('./tables/tasks')
const db = require('./database')

//connect to db
mongoose.connect(db.url, { useNewUrlParser: true }, (err)=>{
    err ? console.log(`Mongo connection error: ${err}`) :
        console.log('Mongo connected!')
})

//table users
users.forEach((item)=>{
    const newUser = new User({
        username: item.username,
        password: item.password
    })

    //save the new user
    newUser.save(err=>{
        if(err){
            console.log(`Error while inserting user ${item.username} - ${err}`)
        }
        console.log(`user ${newUser} successfully inserted`)
        //table tasks
        console.log(newUser._id, ' this is an id')
        tasks.forEach((task)=>{
            const newTask = new Task({
                taskName: task.taskName,
                description: task.description,
                userId: newUser._id,
                dueDate: task.dueDate
            })

            //save the new tasks
            newTask.save(err=>{
                if(err){
                    console.log(`Error while inserting task ${task.taskName} - ${err}`)
                }
                console.log(`task ${newTask} successfully inserted`)
            })
        })
    })
})



