const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        required: 'Email required'
    },
    password: {
        type: String,
        trim: true,
        required: 'Password required'
    }
})

schema.pre('save', next => {
    var user = this;

    // only hash password if it has been modified (is new)
    if (!user.isModified('password')) return next();

    // generate salt
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        // hash password using salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        })
    })
})

// add method to schema to compare given password to encrypted password
schema.methods.validatePassword = password => {
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', schema)

module.exports = User;