const mongoose = require('mongoose')

//user schema
const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Task', taskSchema)