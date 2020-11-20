const db = require("../models");
const path = require('path')
const PostCost = db.postCost // chi phí đăng bài
const Post = db.posts // model của bài đăng

exports.create = async (req, res) => {
    const Room = db.rooms // model cho phòng trọ
    const formData = req.body // các thông tin trong http body

    const sharedOwner = formData.sharedOwner === 'Có' ? true : false;
    const airconditioner = formData.airconditioner === 'Có' ? true : false;
    const balcony = formData.balcony === 'Có' ? true : false;
    const roomImagesLocalPath = path.join(__dirname, `./../../roomImages/${req.roomID}`)
    // tạo instance phòng trọ
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
        accountUsername: 'dthieu223'
    }

    // Lưu phòng trọ trong db
    let newRoom = await Room.create(room)
    let postCost = await PostCost.findAll()

    const price = postCost[0].dataValues;
    const post = {
        postName: formData.postName,
        roomID: newRoom.roomID, // Lấy id phòng trọ tương ứng với bài đăng
        postWeek: newRoom.postWeek,
        postMonth: newRoom.postMonth,
        postYear: newRoom.postYear,
        postCost: formData.postWeek * price.weekCost + formData.postMonth * price.monthCost + formData.postYear * price.yearCost,
        accountUsername: 'dthieu223'
    }
    // Sau đó lưu thông tin bài đăng gắn với phòng trọ
    await Post.create(post)

    res.send({ message: 'Success' })
    // console.log(req.files)
    // console.log(req.body)
}

exports.getUploadFee = async (req, res) => {
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

exports.findByQuery = async (req, res) => {
    const conditions = req.query

    try {
        let result = await Post.findAll({
            where: conditions
        })

        res.send(result)
    } catch (err) {
        console.log("Can't find post with given queries")
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
            res.send({message: 'Verifiy post successfully'})
        }
    } catch (err) {
        res.send(err)
    }
}