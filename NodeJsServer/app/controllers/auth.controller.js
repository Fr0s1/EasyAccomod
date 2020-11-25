const db = require('../models')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth.config')
const bcrypt = require('bcryptjs')

exports.signIn = async (req, res) => {
    const Account = db.accounts

    let account = req.body 

    let username = account.username
    let password = account.password

    try {
        let result = await Account.findAll({
            where: {
                username
            }
        })

        if (result) {
            let account = result[0].dataValues;

            if (bcrypt.compareSync(password, account.password)) {
                let token = jwt.sign({ username: account.username, accountType: account.accountType }, authConfig.secret, {
                    expiresIn: "1d"
                })

                res.status(202).send({
                    username: account.username,
                    accountType: account.accountType,
                    token
                })
                console.log('Logged in')
            } else {
                res.send({message: 'Wrong password'})
            }
        }
    } catch (err) {

    }
}