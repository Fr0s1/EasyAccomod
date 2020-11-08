const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../db')
const router = new express.Router()

const Room = require('../db/room/room')

const room = Room(sequelize, DataTypes)

router.post('/room', async (req, res) => {
    const { ID, roomType, rented, sharedOwner, area, image, usernameOwner } = req.body;

    const newRoom = room.build({
        ID, roomType, rented, sharedOwner, area, image, usernameOwner
    })

    try {
        await newRoom.save()
    } catch (e) {
        res.status(400).send('Internal Error')
    }
    
    res.send(newRoom)
})

module.exports = router