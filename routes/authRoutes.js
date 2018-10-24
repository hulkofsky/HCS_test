const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../config/database')

//LOGIN
router.post('/login', (req,res)=> {
    const username = req.body.username
    const password = req.body.password

    console.log(username, password, "credentials")

    if (!username || !password) {
        res.status(403).json({success: false, message: 'Pls enter username and password to sign in'})
    } else {
        User.findOne({
            username: username
        }, (err, user)=>{
            if(err) throw err
            if(!user) {
                res.send({success: false, message: 'Authentication failed. User not found.'})
            }else{
                //check if passwords match
                user.comparePassword(password, (err, isMatch)=>{
                    if (isMatch && !err) {
                        //create a token
                        const token = `JWT ${jwt.sign(username, config.secret)}`
                        User.updateOne({ username: username }, 
                            { $set: {token: token}},
                            (err, userResult)=>{
                            if(err) throw err
                            res.status(200).json({success: true, user: user})
                        })
                    }else{
                        console.log(err)
                        res.json({success: false, message: 'Authentication failed. Passwords did not match'})
                    }
                })
            }
        })
    }
})

module.exports = router