const { response } = require('express')
const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')
const cors = require('cors')
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

var corsOptions = {
    origin: 'localhost:8080',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

router.get('/room/:id', cors(corsOptions), async (req, res) => {
    const id = req.params.id;

    const url = 'db/room-images/' + id + '/1.jpg';

    let option = {
        root: 'D:/Mon hoc UET/Web_Applications_Development/Project/EasyAccomod/NodeJsServer/'
    }

    res.set({
        'Access-Control-Allow-Origin': 'localhost:4200'
    })
    res.sendFile(url, option);
})

module.exports = router