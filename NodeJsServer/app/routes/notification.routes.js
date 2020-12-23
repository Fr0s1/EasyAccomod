module.exports = app => {
    const notifications = require("../controllers/notification.controller");

    var router = require("express").Router();

    router.get('/:username', notifications.getUserNotification)

    router.post('/', notifications.createNotification)

    app.use('/api/notifications', router);
};