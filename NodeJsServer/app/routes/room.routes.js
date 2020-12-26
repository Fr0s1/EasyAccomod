const multer = require('multer')

module.exports = app => {
    const room = require('../controllers/room.controller')

    const router = require('express').Router()

    // Update room info by room ID 
    router.put('/:id', room.updateRoomInfo)
    
    router.get('/', room.findByQuery)

    router.get('/:id/image/:name', room.getImageByName)

    router.get('/images/:id', room.getRoomImagesByID)

    // Save new image to room image folder
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // Tạo thư mục với tên là id của phòng trọ để lưu ảnh của phòng trọ
            savePath = path.join(__dirname, `./../../roomImages/${req.params.id}`)

            cb(null, savePath)
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    })

    upload = multer({ storage, preservePath: true })

    router.post('/:id/image', upload.array(), room.addRoomImage)

    // Delete specific room's image
    router.delete('/:id/image/:fileName', room.deleteRoomImageByFileName)

    // Delete a room
    router.delete('/:id', room.deleteByID)

    app.use('/api/rooms', router)
}