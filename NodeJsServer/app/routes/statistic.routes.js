module.exports = app => {
    const stats = require("../controllers/statistic.controller.js");

    const router = require('express').Router()

    router.get('/', stats.getNumberOfPostsInTimeRange)

    router.get('/:column/:month/:year', stats.getPostsOrderByColumnInMonthAndYear)

    router.get('/:column', stats.getPostsOrderByColumn)

    app.use('/api/backend/stats', router)
}