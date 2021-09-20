module.exports = app => {
    const userFavorites = require("../controllers/userFavorite.controller");

    var router = require("express").Router();

    router.get('/user/:username', userFavorites.getAllUserFavorite)

    router.get('/post/:postID', userFavorites.getAllPostFavorite)

    router.get('/like/:username/:id', userFavorites.checkUserFavorite)

    router.post('/', userFavorites.createFavorite)

    router.delete('/:username/:id', userFavorites.deleteFavorite)

    app.use('/api/backend/userfavorites', router);
};