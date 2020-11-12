// Handle routes liên quan tới tạo bài đăng

const express = require('express')

let router = express.Router()

router.post('/post/create', (req, res) => {
    res.send('Submitted')
})

module.exports = router