const multer = require('multer')
const db = require('../models')
const path = require('path')
const fs = require('fs')
const { nextTick } = require('process')
module.exports = app => {
    const post = require("../controllers/post.controller.js");

    const room = db.rooms

    var router = require("express").Router();

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // Tạo thư mục với tên là id của phòng trọ để lưu ảnh của phòng trọ
            savePath = path.join(__dirname, `./../../roomImages/${req.roomID}`)

            if (!fs.existsSync(savePath)) {
                fs.mkdirSync(savePath)
            }
            cb(null, savePath)
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })

    // Lấy id của phòng trọ tiếp theo sẽ được insert vào database
    let getNextRoomID = async (req, res, next) => {
        roomID = await room.max('roomID')

        if (!roomID) {
            roomID = 1
        } else {
            roomID += 1
        }

        req.roomID = roomID

        next()
    }

    upload = multer({ storage, preservePath: true })
    router.post("/", getNextRoomID, upload.any(), post.create)

    app.use("/api/posts", router)
}