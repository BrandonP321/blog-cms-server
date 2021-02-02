const router = require('express').Router();
const db = require('../models')
const jwt = require('jsonwebtoken')
const authenticateToken = require('./authenticateToken')
require('dotenv').config();

router.get('/user/all', (req, res) => {
    db.User.find({}, (err, data) => {
        res.json(data)
    })
})

router.post('/user/create', (req, res) => {
    // first check if user with same email already exists
    db.User.find({ email: req.body.email }, (err, data) => {
        // if user exists, send status 409 to client
        if (data.length > 0) {
            res.status(409).send("Email Taken").end();
        } else {
            // if no user with same email exists, add user to db
            db.User.create(req.body, (err, data) => {
                if (err) console.log(err);
                else {
                    // create jwt
                    const accessToken = generateAccessToken({ email: data.email, name: data.name, id: data._id})
                    res.header('auth-token', accessToken).json(data._id).end();
                }
            })
        }
    })
})

router.post('/user/login', (req, res) => {
    // get user from db by their email
    db.User.findOne({ email: req.body.email }, async (err, user) => {
        // if no user found, send status 401
        if (!user) return res.status(401).send('Incorrect email or password').end();
        
        const isValidPassword = await user.validatePassword(req.body.password);

        // if password is valid, send back web token to client
        if (isValidPassword) {
            console.log(user)
            const accessToken = generateAccessToken({ email: user.email, name: user.name, id: user._id })

            res.header('auth-token', accessToken).json(user._id).end();
        } else {
            // if password not valid, send status 401
            res.status(401).send('Incorrect email or password').end();
        }
    })
})

router.put('/user/update/:id', (req, res) => {
    db.User.updateOne({ _id: req.params.id }, { $set: req.body }, (err, data) => {
        if (err) console.log(err)
        else res.status(200).end();
    })
})

router.delete('/user/delete/:id', (req, res) => {
    // delete user from db by their id
    db.User.deleteOne({ _id: req.params.id }, (err, data) => {
        if (err) console.log(err);
        else res.json(data).end();
    })
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m'})
}


module.exports = router