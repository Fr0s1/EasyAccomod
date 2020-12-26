const db = require("../models");
const path = require('path')
const PostCost = db.postCost // chi phí đăng bài
const Post = db.posts // model của bài đăng
const Room = db.rooms // model cho phòng trọ
const sequelize = db.sequelize
const { Op } = require('sequelize')

exports.create = async (req, res) => {
    try {
        const formData = req.body // các thông tin trong http body
        const sharedOwner = formData.sharedOwner === 'Có' ? true : false;
        const airconditioner = formData.airconditioner === 'Có' ? true : false;
        const balcony = formData.balcony === 'Có' ? true : false;

        const roomImagesLocalPath = path.join(__dirname, `./../../roomImages/${req.roomID}`) // directory to save room's images

        // Create room instance 
        const room = {
            roomType: formData.roomType,
            sharedOwner,
            area: formData.area,
            description: formData.description,
            homeNumber: formData.homeNumber,
            street: formData.street,
            ward: formData.ward,
            district: formData.district,
            city: formData.city,
            monthPrice: formData.monthPrice,
            quarterPrice: formData.quarterPrice,
            yearPrice: formData.yearPrice,
            bathroom: formData.bathroom,
            kitchen: formData.kitchen,
            airconditioner,
            balcony,
            electricityPrice: formData.electricityPrice,
            waterPrice: formData.waterPrice,
            imageURI: roomImagesLocalPath,
            otherUtils: formData.otherUtils,
            accountUsername: req.username,
        }

        // Save room in database
        let newRoom = await Room.create(room)

        let postCost = await PostCost.findAll()

        const costs = postCost[0].dataValues;
        const post = {
            postName: formData.postName,
            roomID: newRoom.roomID, // Lấy id phòng trọ vừa được thêm vào database để tương ứng với bài đăng
            postWeek: formData.postWeek,
            postMonth: formData.postMonth,
            postYear: formData.postYear,
            postCost: formData.postCost ? formData.postCost : formData.postWeek * costs.weekCost + formData.postMonth * costs.monthCost + formData.postYear * costs.yearCost,
            accountUsername: req.username,
            verifiedStatus: formData.verifiedStatus === '1',
            paymentStatus: formData.paymentStatus === '1',
            postTime: formData.postTime !== undefined ? new Date(formData.postTime) : null,
            expiredTime: formData.expiredTime !== undefined ? new Date(formData.expiredTime) : null
        }

        // Sau đó lưu thông tin bài đăng
        await Post.create(post)

        res.status(201).send({ message: 'Success' })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

exports.getUploadFee = async (req, res) => {
    // Lấy chi phí đăng bài
    let uploadFee = await PostCost.findAll()

    uploadFee = uploadFee[0].dataValues

    res.send(uploadFee)
}

exports.getPostInfoByID = async (req, res) => {
    const _id = req.params.id

    try {
        let post = await Post.findAll({
            where: {
                postID: _id
            }
        })

        res.send(post)
    } catch (err) {
        res.send(err)
    }
}

exports.getPreviewPosts = async (req, res) => {
    let query = req.query

    let result = await Post.findAll({
        include: {
            model: Room
        },
        limit: 4, order: [[`${query.column}`, 'DESC']], where: {
            [Op.and]: [{
                verifiedStatus: true
            },
            { paymentStatus: true }],
            expiredTime: {
                [Op.gte]: new Date()
            }
        }
    })

    res.send(result)
}


exports.findByQuery = async (req, res) => {
    const conditions = req.query

    try {
        let result = await Post.findAll({
            include: {
                model: Room
            },

            where: conditions
        })
        res.send(result)
    } catch (err) {
        res.send({ error: "Can't find post with given queries" })
    }
}

exports.deleteByQuery = async (req, res) => {
    const conditions = req.query

    try {
        let deletedPosts = Post.destroy({
            where: conditions
        })

        res.send('Posts deleted: ' + deletedPosts)
    } catch (err) {
        res.send(err)
    }
}

exports.updatePostByID = async (req, res) => {
    const info = req.body
    const postID = req.params.id

    try {
        let result = await Post.update(info, {
            where: {
                postID
            }
        })
        if (result == 1) {
            res.send({ message: 'Updated post successfully' })
        }
    } catch (err) {
        res.send(err)
    }
}

exports.updatePostByForm = async (req, res) => {

    try {
        const formData = req.body // các thông tin trong http body
        console.log(formData)

        const sharedOwner = formData.sharedOwner === 'Có' ? true : false;
        const airconditioner = formData.airconditioner === 'on' ? true : false;
        const balcony = formData.balcony === 'on' ? true : false;

        // Create room instance 
        const newRoomInfo = {
            roomType: formData.roomType,
            sharedOwner,
            area: formData.area,
            description: formData.description,
            homeNumber: formData.homeNumber,
            street: formData.street,
            ward: formData.ward,
            district: formData.district,
            city: formData.city,
            monthPrice: formData.monthPrice,
            quarterPrice: formData.quarterPrice,
            yearPrice: formData.yearPrice,
            bathroom: formData.bathroom,
            kitchen: formData.kitchen,
            airconditioner,
            balcony,
            electricityPrice: formData.electricityPrice,
            waterPrice: formData.waterPrice,
            otherUtils: formData.otherUtils,
        }

        // Save newRoomInfo in database
        let newRoom = await Room.update(newRoomInfo, {
            where: {
                roomID: formData.roomID
            }
        })

        const post = {
            postName: formData.postName,
            postWeek: formData.postWeek,
            postMonth: formData.postMonth,
            postYear: formData.postYear,
            postCost: formData.postCost ? formData.postCost : formData.postWeek * costs.weekCost + formData.postMonth * costs.monthCost + formData.postYear * costs.yearCost,
        }

        let result = await Post.update(post, {
            where: {
                postID: formData.postID
            }
        })

        res.send({ message: 'Updated post successfully' })
    } catch (err) {
        res.send({ error: "Can't update post" })
    }
}
