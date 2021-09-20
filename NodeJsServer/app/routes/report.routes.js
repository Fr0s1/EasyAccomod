module.exports = app => {
    const reportedPost = require('../controllers/report-posts.controller')

    var router = require('express').Router()

    router.post('/', reportedPost.addReport)

    router.get('/', reportedPost.getReport)

    router.delete('/:id', reportedPost.deleteReport)
    
    app.use("/api/backend/report", router)
}