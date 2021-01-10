const router = require('express').Router();
const db = require('../models')

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
            res.status(409).end();
        } else {
            // if no user with same email exists, add user to db
            db.User.create(req.body, (err, data) => {
                if (err) console.log(err);
                else {
                    res.json(data).end();
                }
            })
        }
    })
})

router.post('/user/login', (req, res) => {
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

module.exports = router