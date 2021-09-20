const db = require('../models/index')
const path = require('path')
const fs = require('fs')

module.exports = app => {
    const messages = require("../controllers/message.controller");

    var router = require("express").Router();

    var multer = require('multer')

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // Tạo thư mục với tên là id của tin nhắn để lưu ảnh trong tin nhắn
            let savePath
            if (req.messageID) {
                // For creating new message
                savePath = path.join(__dirname, `./../messageImages/${req.messageID}`)
            } else {
                // For saving images in message
                savePath = path.join(__dirname, `./../messageImages/${req.body.messageID}`)
            }

            if (!fs.existsSync(savePath)) {
                fs.mkdirSync(savePath, { recursive: true })
            }

            cb(null, savePath)
        },
        filename: function (req, file, cb) {
            // Add date to make sure that new file's name isn't duplicated
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)) // path.extname: add right file extension
        }
    })

    // Lấy id của tin nhắn tiếp theo sẽ được insert vào database
    let getNextMessageID = async (req, res, next) => {
        let message = db.Messages
        let sequelize = db.sequelize

        messageID = await message.max('messageID')

        if (!messageID) { // If messages table is empty
            await sequelize.query('ALTER TABLE messages AUTO_INCREMENT = 1')
            messageID = 1
        } else {
            // To make sure that new messageID in database equal new id in messageImages folder
            await sequelize.query(`ALTER TABLE messages AUTO_INCREMENT = ${messageID}`)
            messageID += 1
        }

        req.messageID = messageID

        next()
    }

    upload = multer({ storage, preservePath: true })

    router.post('/', getNextMessageID, upload.any(), messages.saveMessage)

    router.get('/', messages.getMessages)

    router.get('/image/:messageID', messages.getImagesByMessageID)

    router.get('/:messageID/image/:fileName', messages.getImageByFileName)

    router.get('/contact', messages.getContactList)
    
    app.use('/api/chat/message', router);
};