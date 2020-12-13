module.exports = app => {
    const userFavorites = require("../controllers/userFavorite.controller");

    var router = require("express").Router();

    router.get('/user/:username', userFavorites.getAllUserFavorite)

    router.get('/post/:postID', userFavorites.getAllPostFavorite)

    router.post('/', userFavorites.createFavorite)

    router.delete('/', userFavorites.deleteFavorite)

    app.use('/api/userfavorites', router);
};