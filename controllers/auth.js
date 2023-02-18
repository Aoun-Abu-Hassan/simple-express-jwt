const { validationResult } = require("express-validator");
const crypto = require('crypto');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config.json')
const users = []
exports.signUp = async(req,res,next) => {
    try{
        const errors = validationResult(req)
        const emailExists = users.find(user => user.email === req.body.email)
        if(!errors.isEmpty()){
            const error = new Error('Validation failed')
            error.statusCode = 422;
            error.data = errors.array()
            throw error
        }
        if(emailExists){
            const error = new Error('Email already exists')
            error.statusCode = 422;
            error.message = 'Email already exists'
            throw error
        }
        const {email,password} = req.body
        const hashedPassword = await bcrypt.hash(password,12)
        users.push({
            email:email,
            password:hashedPassword,
            uuid:generateSecureUniqueId(24)
        })
        res.status(201).json({
            message:'User created',
            userId:users[users.length-1].uuid
        })

    }catch(e){
        if(!e.statusCode){
            e.statusCode = 500;
        }
        next(e)
    }
}

exports.signIn = async(req,res,next) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const error = new Error('Validation failed')
            error.statusCode = 422;
            error.data = errors.array()
            throw error
        }
        const {email,password} = req.body
        const user = users.find(user => user.email === email)
        if(!user){
            const error = new Error('user not found')
            error.statusCode = 404;
            throw error
        }
        const isEqual = await bcrypt.compare(password,user.password)
        if(!isEqual){
            const error = new Error('Wrong password')
            error.statusCode = 401;
            error.message = 'Wrong password'
            throw error
        }
        const token = jwt.sign({
            email:user.email,
            userId:user.uuid
        },config.secretKey,{
            expiresIn:'1h'
        })
        res.status(200).json({
            token:token,
            userId:user.uuid
        })
    } catch (e) {
        if(!e.statusCode){
            e.statusCode = 500;
        }
        next(e)
    }
}


function generateSecureUniqueId(length) {
    if (length < 1) {
      throw new Error('Length must be greater than 0');
    }
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
  }