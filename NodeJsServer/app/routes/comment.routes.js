module.exports = app => {
    const comments = require("../controllers/comment.controller");

    var router = require("express").Router();

    router.get('/', comments.getComments)

    router.post('/', comments.addComment)

    router.put('/:id', comments.updateComment)
    
    router.delete('/:id', comments.deleteComment)
    
    app.use('/api/comments', router);
};