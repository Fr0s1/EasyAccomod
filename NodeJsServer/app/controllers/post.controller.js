const db = require("../models");

exports.create = (req, res) => {
    const Room = db.rooms // model cho phòng trọ
    const Post = db.posts // model của bài đăng

    const formData = req.body // các thông tin trong http body

    // tạo instance phòng trọ
    const room = {
        roomType: formData.roomType,
        sharedOwner: formData.sharedOwner,
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
        airconditioner: formData.airconditioner,
        balcony: formData.balcony,
        electricityPrice: formData.electricityPrice,
        waterPrice: formData.waterPrice,
        otherUtils: formData.otherUtils,
        accountUsername: formData.accountUsername
    }


    // Lưu phòng trọ trong db
    Room.create(room)
        .then(data => {
            res.send(data)
            const post = {
                postName: formData.postName,
                roomID: data.roomID
            }
            // Sau đó lưu thông tin bài đăng gắn với phòng trọ
            Post.create(post).then(data => console.log(data))
        })
        .catch(e => {
            res.send(e)
        })
}