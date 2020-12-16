const jwt = require("jsonwebtoken")
const authConfig = require('../config/auth.config')
const db = require('../models')
const Account = db.accounts

verifyToken = async (req, res, next) => {
    try {
        let token = req.header('Authorization').replace('Bearer ', '')

        const decoded = jwt.verify(token, authConfig.secret)

        let account = await Account.findAll({
            where: {
                username: decoded.username
            }
        })

        if (account) {
            req.username = decoded.username
        }
        next()
    } catch (err) {
        res.send('Invalid token')
    }
}

module.exports = {
    verifyToken
}