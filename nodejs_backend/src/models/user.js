const mongoose  = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        //unique: true,
        required: true,
        trim: true,
//        validate(value){
//            if (!validator.isEmail(value)){
//                throw new Error('Email is invalid')
//            }
//        }
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if (value.includes('password')){
                throw new error('Password can not contain password')
            }
        }
    },
    account:{
        type: String,
        enum: ['guest', 'staff', 'hotelManager'],
        trim: true
    },
    designation:{//will be deleted
        type: String,
        enum: ['admin', 'personal'],
        trim: true,
        validate(){
            if (this.account !== 'staff'){
                throw new Error('Sorry, Not allowed')
            }
        }
    },
    department:{
        type: String,
        enum: ['house keeping', 'room service', 'bellboy'],
        trim: true,
        validate(){
            if (this.account !== 'staff'){
                throw new Error('Sorry, Not allowed')
            }
        }
    },
    // ToDo Labeling "Room_number" as required on SuperUser HTML page.
    roomNumber:{
        type: Number,
    },
    mobile:{
        type: Number,
    },
    arriveDate:{
        type: Date
    },
    departDate: {
        type: Date
    },
    joiningDate: {
        type: Date
    },
    address: {
        type: String,
        trim: true
    },
    education: {
        type: String,
        trim: true
    },
    hotelName: {
        type: String,
        trim: true
    },
    lockStatus:{
    type: String,
    trim: true
    },
    tokens:[{
        token: {
            type: String,
            required: true
        }
    }]
})


userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.token

    return userObject
}

userSchema.methods.generateAuthToken = async function ()  {
    const user = this
    const token = jwt.sign({ _id : user._id.toString() }, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!email){
        throw new Error (`unable to login`)
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch){
        throw new Error(`Unable to login`)
    }



    return user
}

userSchema.pre('save', async function (next)  {
    const user = this
    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('Users', userSchema)

module.exports = User