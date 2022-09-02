const mongoose = require('mongoose')
const crypto = require('crypto')

// we are passing the schema obj
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        require: true,
        max: 12,
        unique: true,
        index: true,
        lowercase:true
    },

    name: {
        type: String,
        trim: true,
        required: true,
        max:32
    },

    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        max:32,
        lowercase:true
    },

    hashed_password: {
        type: String,
        required: true       
    },

    salt: String,
    role: {
        type: String,
        default: 'subscriber'
    },
    
    resetPasswordLink: {
        type: String,
        default:''
    }
},
 {timestamps:true}

);  // 2nd arg will timestamp creation date/time

//virtual fields not to be persisted to database
userSchema.virtual('password')
    .set(function(password) {

        //create temp var
        this._password = password

        //generate salt
        this.salt = this.makeSalt()

        //encrypt pw
        this.hashed_password = this.encryptPassword(password)
    })

//methods > authenticate, encrypt pw, makeSalt  
//1. no pw return nothing, if pw create hash with cryto mod 1st arg is alg name, 2nd arg
//2. update pw to hashed pw
userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {

        if(!password) return ''
        try {
            return crypto.createHmac('sha1', this.salt)
            .update(password)
            .digest('hex');
        } catch (err) {
            return ''
        }
    },

    //producing random number based off of date value times random  decimal number rounded up
    makeSalt:function() {
        return Math.round(new Date().valueOf() * Math.random()) + ''
    }
};

//export user model

module.exports = mongoose.model('User', userSchema)