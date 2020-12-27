const multer = require('multer')
const db = require('../models')
const path = require('path')
const fs = require('fs')
const authJwt = require('../middleware/authJwt')
const { sequelize } = require('../models')

module.exports = app => {
    const post = require("../controllers/post.controller.js");

    const room = db.rooms

    var router = require("express").Router();

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            // Tạo thư mục với tên là id của phòng trọ để lưu ảnh của phòng trọ
            let savePath
            if (req.roomID) {
                // For creating new post
                savePath = path.join(__dirname, `./../../roomImages/${req.roomID}`)
            } else {
                // For saving new image to existing room
                savePath = path.join(__dirname, `./../../roomImages/${req.body.roomID}`)
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

    // Lấy id của phòng trọ tiếp theo sẽ được insert vào database
    let getNextRoomID = async (req, res, next) => {
        roomID = await room.max('roomID')

        if (!roomID) { // If room table is empty
            await sequelize.query('ALTER TABLE rooms AUTO_INCREMENT = 1')
            roomID = 1
        } else {
            // To make sure that new roomID in database equal new id in roomImages folder
            await sequelize.query(`ALTER TABLE rooms AUTO_INCREMENT = ${roomID}`)
            roomID += 1
        }

        req.roomID = roomID

        next()
    }

    upload = multer({ storage, preservePath: true })

    // Create new post with corresponding roomID
    router.post("/", authJwt.verifyToken, getNextRoomID, upload.any(), post.create)

    // Update post and room info by submitting form
    router.put("/form", upload.any(), post.updatePostByForm)

    // Get preview posts by requirement for homepage
    router.get("/preview", post.getPreviewPosts)

    // Get post upload fee
    router.get("/uploadFee", post.getUploadFee)

    // Get post info by ID
    router.get("/:id", post.getPostInfoByID)

    // Get post with conditions specified in URL query string
    // find all if the req.query obj is empty
    router.get("/", post.findByQuery)

    // Update post info with given postID 
    router.put("/:id", post.updatePostByID)

    // Delete posts with columns satisfy conditions in query string
    router.delete("/", post.deleteByQuery)

    app.use("/api/posts", router)
}