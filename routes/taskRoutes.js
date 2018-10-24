const express = require('express')
const router = express.Router()

const Task = require('../models/task')
const task = new Task()

const User = require('../models/user')
const user = new User()

//get all user tasks
router.get('/:userId/tasks', (req,res)=>{
    const userId = req.params.userId
    const token = req.headers.token

    console.log(userId, 'userid get all users')
    console.log(token, 'token get all users')


    if(!userId){
        return res.status(404).json({success: false, message: '404.Not found'})
    }

    if(!token){
        return res.status(403).json({success: false, message: 'Token expired'})
    }

    User.find({
        _id: userId,
        token: token
    }, (err, userResult)=>{
        if(err) throw err
        
        if(userResult&&(Array.isArray(userResult)&&userResult.length>0)){
            Task.find({
                userId: userId
            }, (err, tasks)=>{
                if(err) throw err
                if(!tasks) {
                    res.status(200).json({success: true, message: 'No tasks found'})
                }else{
                    res.status(200).json({success: true, tasks: tasks})
                }
            })
        }else{
            res.status(404).json({success: false, message: 'User not found'})
        }
    })
})

//get task by id
router.get('/:userId/tasks/:taskId', (req,res)=>{
    const userId = req.params.userId
    const taskId = req.params.taskId
    const token = req.headers.token

    if(!userId||!taskId){
        return res.status(404).json({success: false, message: '404.Not found'})
    }

    if(!token){
        return res.status(403).json({success: false, message: 'Unauthorized'})
    }

    User.find({
        _id: userId,
        token: token
    }, (err, userResult)=>{
        if(err) throw err
        
        if(userResult&&(Array.isArray(userResult)&&userResult.length>0)){
            Task.findOne({
                _id: taskId,
                userId: userId
            }, (err, task)=>{
                if(err) throw err
                if(!task) {
                    res.status(200).json({success: true, message: 'No tasks found'})
                }else{
                    res.status(200).json({success: true, task: task})
                }
            })
        }else{
            res.status(404).json({success: false, message: 'User not found'})
        }
    })
})

router.post('/:userId/tasks', (req,res)=>{
    const userId = req.params.userId
    const token = req.headers.token
    const taskName = req.body.taskName
    const description = req.body.description
    const dueDate = req.body.dueDate


    if(!userId){
        return res.status(404).json({success: false, message: '404.Not found'})
    }

    if(!token){
        return res.status(403).json({success: false, message: 'Unauthorized'})
    }

    if(!taskName||!description||!dueDate){
        return res.status(500).json({success: false, message: 'Pls enter task name description and due date.'})
    }

    User.find({
        _id: userId,
        token: token
    }, (err, userResult)=>{
        if(err) throw err
        if(userResult&&(Array.isArray(userResult)&&userResult.length>0)){

            const newTask = new Task({
                taskName: taskName,
                description: description,
                userId: userId,
                dueDate: dueDate
            })

            newTask.save((err, task)=>{
                if(err) throw err
                res.status(200).json({success: true, message: 'Task successfully added.', task: task})
            })
        }else{
            res.status(404).json({success: false, message: 'User not found'})
        }
    })
})

router.put('/:userId/tasks/:taskId', (req,res)=>{
    const userId = req.params.userId
    const token = req.headers.token
    const taskName = req.body.taskName
    const description = req.body.description
    const taskId = req.params.taskId
    const dueDate = req.body.dueDate

    if(!userId||!taskId){
        return res.status(404).json({success: false, message: '404.Not found'})
    }

    if(!token){
        return res.status(403).json({success: false, message: 'Unauthorized'})
    }

    if(!taskName||!description||!dueDate){
        return res.status(500).json({success: false, message: 'Pls enter task name, description and due date.'})
    }

    User.find({
        _id: userId,
        token: token
    }, (err, userResult)=>{
        if(err) throw err
        if(userResult&&(Array.isArray(userResult)&&userResult.length>0)){

            const newTask = new Task({
                taskName: taskName,
                description: description,
                userId: userId,
                dueDate: dueDate
            })

            Task.updateOne({ _id: taskId }, 
                { $set: {taskName: taskName, description: description, dueDate: dueDate}},
                (err, result)=>{
                if(err) throw err
                res.status(200).json({success: true, message: 'Task successfully updated.'})
            })
        }else{
            res.status(404).json({success: false, message: 'User not found'})
        }
    })
})

router.delete('/:userId/tasks/:taskId', (req,res)=>{
    const userId = req.params.userId
    const token = req.headers.token
    const taskId = req.params.taskId

    if(!userId||!taskId){
        return res.status(404).json({success: false, message: '404.Not found'})
    }

    if(!token){
        return res.status(403).json({success: false, message: 'Unauthorized'})
    }

    User.find({
        _id: userId,
        token: token
    }, (err, userResult)=>{
        if(err) throw err
        
        if(userResult&&(Array.isArray(userResult)&&userResult.length>0)){

            Task.deleteOne({ _id: taskId }, (err, result)=>{
                if(err) throw err
                res.status(200).json({success: true, message: 'Task successfully deleted.'})
            })
        }else{
            res.status(404).json({success: false, message: 'User not found'})
        }
    })

})

module.exports = router