const router = require('express').Router();
const db = require('../models');

router.get('/post/all', (req, res) => {
    db.Post.find({}, (err, data) => {
        if (err) console.log(err);
        else res.json(data).end();
    })
})

router.get('/post/:id', (req, res) => {
    db.Post.findOne({ _id: req.params.id }, (err, data) => {
        if (err) console.log(err)
        else res.json(data).end();
    })
})

router.get('/user/:userId/post/all', (err, data) => {
    db.Post.find({ creatorId: req.params.userId }, (err, data) => {
        if (err) console.log(err);
        else res.json(data).end();
    })
})

router.post('/post/create', (req, res) => {
    db.Post.create(req.body, (err, data) => {
        if (err) console.log(err);
        else res.json(data).end();
    })
})

router.put('/post/update/:id', (req, res) => {
    db.Post.updateOne({ _id: req.params.id }, { $set: req.body }, (err, data) => {
        if (err) console.log(err);
        else res.json(data).end();
    })
})

router.delete('/post/delete/:id', (req, res) => {
    db.Post.deleteOne({ _id: req.params.id }, (err, data) => {
        if (err) console.log(err);
        else res.status(200).end();
    })
})

module.exports = router;