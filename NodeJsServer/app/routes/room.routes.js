module.exports = app => {
    const room = require('../controllers/room.controller')

    const router = require('express').Router()

    router.get('/', room.findByQuery)
        
    router.get('/:id/image/:name', room.getImageByName)

    router.get('/images/:id', room.getRoomImagesByID)

    router.delete('/:id', room.deleteByID)

    app.use('/api/rooms', router)
}