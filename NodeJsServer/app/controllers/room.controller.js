const fs = require('fs')
const db = require('../models')
const Room = db.rooms

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