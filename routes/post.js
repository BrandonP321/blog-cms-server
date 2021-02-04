const router = require('express').Router();
const mongoose = require('mongoose');
const db = require('../models');
const authenticateToken = require('./authenticateToken')

router.get('/post/test', authenticateToken, (req, res) => {
    // get user data from request after being set in authenticateToken function
    console.log(req.user)
    res.send('good')
})

router.get('/post/all', (req, res) => {
    // get all posts from db and populate with creator info
    db.Post.find({}).populate('creator')
        .exec((err, posts) => {
            // remove sensitive info from creator obj
            const modifiedPosts = posts.map(post => {
                return {
                    ...post._doc,
                    creator: post.creator.name
                }
            })
            
            res.json(modifiedPosts)
        })
})

router.get('/post/:id', (req, res) => {
    db.Post.findOne({ _id: req.params.id }, (err, data) => {
        if (err) console.log(err)
        else res.json(data).end();
    })
})

router.get('/user/:userId/post/all', (req, res) => {
    db.Post.find({ creator: mongoose.Types.ObjectId(req.params.userId) }, (err, data) => {
        console.log(data)
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
    console.log(req.params.id, req.body)
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