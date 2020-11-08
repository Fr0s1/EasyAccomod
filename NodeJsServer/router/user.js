const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')

const sequelize = require('../db')
const router = new express.Router()

const UserAccount = require('../db/user-accounts/useraccounts')

const userAccout = UserAccount(sequelize, DataTypes)

router.post('/user', async (req, res) => {
    const { username, password } = req.body;

    const newUser = userAccout.build({ username, password})

    await newUser.save()

    res.send(newUser)
})

module.exports = router