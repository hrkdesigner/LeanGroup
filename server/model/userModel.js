const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')


//User Register Schema
const UserSchema = new mongoose.Schema({
    firstName : {type: String, required: true},
    lastName : {type: String, required: true},
    email : {type: String, required: true},
    password : {type: String, required: true},
    age: {type:String},
    
})


//Password Hashing
UserSchema.pre('save', function(next) {                                                                                                                                        
    if(this.password) {                                                                                                                                                        
        var salt = bcrypt.genSaltSync(10)                                                                                                                                     
        this.password  = bcrypt.hashSync(this.password, salt)                                                                                                                
    }                                                                                                                                                                          
    next()                                                                                                                                                                     
})                                                                                                                                                                                                                                                                                                                                                          

//Token Generator
UserSchema.method.tokenGenerator = (user) =>{
    return token = jwt.sign({id : user._id}, process.env.SECRET)
}

//User Model
const User = mongoose.model('user', UserSchema);


module.exports = User