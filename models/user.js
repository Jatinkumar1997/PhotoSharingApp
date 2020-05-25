const mongoose = require('mongoose')
const validator = require('validator')
const pwdValidator = require('password-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

var pwdValidatorfun = new pwdValidator()
 
pwdValidatorfun
.is().min(15)                                    
.has().uppercase()                              
.has().lowercase()                              
.has().digits()                                 
.has().symbols()                        


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim: true
    },
    email: {
        type: String,
        unique:true,
        required:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is Invalid')
            }
        }
    },
    password: {
        type: String,
        required:true,
        minlength:15,
        validate(value){
            if(!pwdValidatorfun.validate(value)){
                throw new Error('Password is Invalid')
            }
        }
    },
    tokens:[{
        token: {
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
})

userSchema.virtual('uploadedImages', {
    ref: 'Image',
    localField: '_id',
    foreignField: 'uploadedBy'
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({ _id:user._id.toString() }, 'secret')

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email,password) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to retrive User')
    }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User