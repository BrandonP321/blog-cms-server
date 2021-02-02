const router = require('express').Router();
const authenticateToken = require('./authenticateToken')

router.get('/auth/token', authenticateToken, (req, res) => {
    // if token wasn't denied in middle ware function, send user info to client
    res.json(req.user).end();
})

module.exports = router;