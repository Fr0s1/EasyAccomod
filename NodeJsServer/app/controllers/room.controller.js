const fs = require('fs')
const db = require('../models')
const Room = db.rooms

exports.getRoomInfoByID = async (req, res) => {
    let _id = req.params.id

    try {
        let selectedRoom = await Room.findAll({
            where: {
                roomID: _id
            }
        })

        res.send(selectedRoom)
    } catch (err) {
        res.send({ message: 'Room not exist' })
    }
}
exports.getRoomImagesByID = async (req, res) => {
    let _id = req.params.id

    try {
        let selectedRoom = await Room.findAll({
            attributes: ['roomID', 'imageURI'],
            where: {
                roomID: _id
            }
        })

        if (!selectedRoom || selectedRoom.length == 0) {
            res.send(`Can't find room with id = ${_id}`)
        }

        let roomImagesDirPath = selectedRoom[0].dataValues.imageURI

        let roomImagesDir = fs.readdirSync(roomImagesDirPath)

        res.send(roomImagesDir)
    } catch (err) {
        res.send({ message: err })
    }
}

exports.getImageByName = async (req, res) => {
    let params = req.params
    try {
        let selectedRoom = await Room.findAll({
            attributes: ['roomID', 'imageURI'],
            where: {
                roomID: params.id,
            }
        })

        if (!selectedRoom || selectedRoom.length == 0) {
            res.send(`Can't find room with id = ${_id}`)
        }

        let roomImagesDirPath = selectedRoom[0].dataValues.imageURI

        let imagePath = roomImagesDirPath + `/${params.name}`

        if (fs.existsSync(imagePath)) {
            res.sendFile(imagePath)
        } else {
            res.send({ message: "Can't find image with given name" })
        }

    } catch (err) {
        res.send({ message: err })
    }
}

exports.deleteByID = async (req, res) => {
    const _id = req.params.id

    let deletedRoom = await Room.findAll({
        attributes: ['roomID', 'imageURI'],
        where: {
            roomID: _id
        }
    })

    deletedRoom = deletedRoom[0].dataValues

    if (fs.existsSync(deletedRoom.imageURI)) {
        await fs.rmdirSync(deletedRoom.imageURI, { recursive: true })
    }
    try {
        await Room.destroy({
            where: {
                roomID: _id
            }
        })

        res.send(`Deleted room with id = ${_id}`)
    } catch (err) {
        res.send("can't deleted room")
    }
}