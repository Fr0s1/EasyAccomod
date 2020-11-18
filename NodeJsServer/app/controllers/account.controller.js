const db = require("../models");
const Account = db.accounts;
const User = db.users;
const sequelize = db.sequelize
const Op = db.Sequelize.Op;
const { QueryTypes } = require('sequelize');
// Create and Save a new account
exports.create = (req, res) => {
  // Validate request
  const accountData = req.body
  if (!accountData.username || !accountData.password || !accountData.accountType || !accountData.userIdCard ||
    !accountData.verified || !accountData.online) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create an account
  const account = {
    username: accountData.username,
    password: accountData.password,
    accountType: accountData.accountType, // Loại tài khoản: 'renter' hoặc 'landlord'
    userIdCard: accountData.userIdCard,
    verified: accountData.verified, // trạng thái phê duyệt
    online: accountData.online,
  };

  if (account.accountType === 'renter') {
    account.verified = true
  }
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

exports.findByVerifiedStatus = (req, res) => {
  const verifiedStatus = req.query.verified

  Account.findAll({
    where: {
      verified: verifiedStatus
    }
  }).then(data => {
    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving accounts."
      });
    });
}

exports.getUserInfo = async (req, res) => {
  const username = req.params.username
  const results = await sequelize.query(`SELECT username, fullName, idCard, phoneNumber, email, address FROM users JOIN accounts ON users.idCard = accounts.userIdCard WHERE username='${username}' `, { type: QueryTypes.SELECT })

  // console.log(results)
  res.send(results)
}

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
  const username = req.params.username;

  Account.update(req.body, {
    where: { username }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "account was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update account with username=${username}. Maybe account was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating account with username=" + username
      });
    });
};



