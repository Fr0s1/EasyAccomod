
module.exports = app => {
    const comments = require("../controllers/comment.controller");

    var router = require("express").Router();

    router.get('/', comments.getComments)

    router.post('/', comments.addComment)

    app.use('/api/comments', router);
};