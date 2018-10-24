const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
    }
})

//compare the password
userSchema.methods.comparePassword = function(pw, cb){
    bcrypt.compare(pw, this.password, (err, isMatch)=>{
        if (err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('User', userSchema)