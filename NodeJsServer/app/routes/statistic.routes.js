module.exports = app => {
    const stats = require("../controllers/statistic.controller.js");

    const router = require('express').Router()

    router.get('/', stats.getNumberOfPostsInTimeRange)

    router.get('/:column/:month', stats.getPostsOrderByColumnInMonth)

    router.get('/:column', stats.getPostsOrderByColumn)

    app.use('/api/stats', router)
}