const db = require("../models");
const Account = db.accounts;
const Op = db.Sequelize.Op;

// Create and Save a new account
exports.create = (req, res) => {
    // Validate request
    if (!req.body.username || !req.body.password || !req.body.accountType || !req.body.idCard ||
        !req.body.state || !req.body.online) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
    return;
    }
    
    // Create an account
    const account = {
        username: req.body.username,
        password: req.body.password,
        accountType: req.body.accountType,
        idCard: req.body.idCard,
        state: req.body.state,
        online: req.body.online,
    };
    
    // Save account in the database
    Account.create(account)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the account."
        });
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Account.findByPk(id)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving account with id=" + id
        });
    });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Account.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving accounts."
            });
        });
};

exports.findByUsername = (req, res) => {
    const searchUsername = req.params.username;
    
    Account.findOne({ where: { username: searchUsername } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "No account with " + searchUsername + " found!"
        });
    });
};

exports.findByType = (req, res) => {
    const searchType = req.params.type;
    
    Account.findOne({ where: { accountType: searchType } })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: "No account with " + searchType + " found!"
        });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Account.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Account was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete account with id=${id}. Maybe account was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete account with id=" + id
        });
    });
};

exports.edit = (req, res) => {
    const id = req.params.id;

    Account.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "account was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update account with id=${id}. Maybe account was not found or req.body is empty!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating account with id=" + id
        });
    });
};



