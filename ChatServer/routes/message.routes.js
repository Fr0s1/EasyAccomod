module.exports = app => {
    const messages = require("../controllers/message.controller");

    var router = require("express").Router();

    router.post('/', messages.saveMessage)

    router.get('/', messages.getMessages)

    router.get('/contact', messages.getContactList)
    
    app.use('/api/message', router);
};