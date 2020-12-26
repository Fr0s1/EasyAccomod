const fs = require('fs')
const { Op } = require('sequelize')
const db = require('../models')
const Room = db.rooms
const path = require('path')

exports.updateRoomInfo = async (req, res) => {
    const info = req.body
    const roomID = req.params.id

    try {
        let result = await Room.update(info, {
            where: {
                roomID
            }
        })
        if (result == 1) {
            res.send({ message: `Updated room with ${roomID} successfully` })
        }
    } catch (err) {
        res.send(err)
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

exports.addRoomImage = async (req, res) => {
    if (req.files.length != 0) {
        res.send({ message: 'Success' })

    } else {
        res.send({ error: "Can't add new image " })
    }
}

exports.deleteRoomImageByFileName = async (req, res) => {
    let data = req.params

    try {
        let folderPath = await Room.findAll({
            attributes: ['imageURI'],
            where: {
                roomID: data.id
            },
            raw: true,
        })

        let imageFolderPath = folderPath[0].imageURI

        let imagePath = path.join(imageFolderPath, data.fileName)

        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath)
            res.send({ message: 'Deleted file with given name' })
        } else {
            res.send({ message: "File doesn't exist" })
        }
    } catch (err) {
        res.send({ error: "Internal server error" })
    }
}

exports.findByQuery = async (req, res) => {
    const conditions = req.query
    const Post = db.posts

    let priceRange
    let areaRange

    if (conditions.monthPrice) {
        conditions.monthPrice = conditions.monthPrice.replace(/ triệu/g, '000000')
        priceRange = conditions.monthPrice.split(' ')
        delete conditions.monthPrice
    }

    if (conditions.area) {
        areaRange = conditions.area
        conditions.area = areaRange.replace(/m2/g, '')
        areaRange = conditions.area.split(' ')
        delete conditions.area
    }

    if (conditions.sharedOwner) {
        conditions.sharedOwner = (conditions.sharedOwner === 'Có' ? true : false)
    }

    try {
        let result = []
        if (areaRange && priceRange) {
            result = await Post.findAll({
                include: {
                    model: Room,
                    where: {
                        [Op.and]: [{ ...conditions },
                        {
                            monthPrice: {
                                [Op.between]:
                                    [priceRange[0], priceRange[2]],
                            }
                        },
                        {
                            area: {
                                [Op.between]:
                                    [areaRange[0], areaRange[2]],
                            }
                        }]
                    }
                },
                where: {
                    verifiedStatus: 1,
                    paymentStatus: 1
                }
            })
        } else if (priceRange) {
            result = await Post.findAll({
                include: {
                    model: Room,
                    where: {
                        [Op.and]: [{ ...conditions },
                        {
                            monthPrice: {
                                [Op.and]: {
                                    [Op.between]:
                                        [priceRange[0], priceRange[2]],

                                }
                            }
                        }]
                    }
                },
                where: {
                    verifiedStatus: 1,
                    paymentStatus: 1
                }
            })
        } else if (areaRange) {
            result = await Post.findAll({
                include: {
                    model: Room,
                    where: {
                        [Op.and]: [{ ...conditions },
                        {
                            area: {
                                [Op.and]: {
                                    [Op.between]:
                                        [areaRange[0], areaRange[2]],

                                }
                            }
                        }]
                    }
                },
                where: {
                    verifiedStatus: 1,
                    paymentStatus: 1
                }
            })
        } else {
            result = await Post.findAll({
                include: {
                    model: Room,
                    where: conditions
                },
                where: {
                    verifiedStatus: 1,
                    paymentStatus: 1
                }
            })
        }

        res.send(result)

    } catch (err) {
        res.send({ error: err })
    }
}