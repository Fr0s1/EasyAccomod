const db = require('../models')
const Message = db.Messages
const Sequelize = db.Sequelize
const ContactList = db.ContactList
const { Op } = require('sequelize')

// Save message to db
exports.saveMessage = async (req, res) => {
    let data = req.body

    try {
        console.log(data)
        let newMessage = {
            content: data.content,
            sender: data.sender,
            receiver: data.receiver
        }

        let contact = await ContactList.findAll({
            where: {
                sender: newMessage.sender,
                receiver: newMessage.receiver
            }
        })

        // If this is the first message between 2 accounts, add each account to other's contact list
        if (contact.length === 0) {
            await ContactList.create({
                sender: newMessage.sender,
                receiver: newMessage.receiver
            })

            await ContactList.create({
                sender: newMessage.receiver,
                receiver: newMessage.sender
            })
        }

        await Message.create(newMessage)

        res.status(200).send({ message: 'Save message successfully' })
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: 'Internal server error' })
    }
}

exports.getMessages = async (req, res) => {
    let condition = req.query

    let result = await Message.findAll({
        order: [['createdAt', 'ASC']],
        where: {
            [Op.or]:
                [
                    {
                        [Op.and]: [{ sender: condition.sender, receiver: condition.receiver }]
                    },
                    {
                        [Op.and]: [{ sender: condition.receiver, receiver: condition.sender }]
                    }
                ]
        }
    })

    res.send(result)
}

// Get all unique accounts that a current logged in account has sent messages to
exports.getContactList = async (req, res) => {

    let currentUser = req.query.username

    let result = await ContactList.findAll({
        attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('receiver')), 'receiver']
        ],
        where: {
            sender: currentUser
        }
    })

    res.send(result)
}