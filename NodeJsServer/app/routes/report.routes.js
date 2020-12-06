module.exports = app => {
    const reportedPost = require('../controllers/report-posts.controller')

    var router = require('express').Router()

    router.post('/', reportedPost.addReport)

    router.get('/', reportedPost.getReport)
    
    app.use("/api/report", router)
}