const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.password || !req.body.fullName || !req.body.job ||
      !req.body.group || !req.body.phoneNumber || !req.body.email || !req.body.dateOfBirth
      || ((!req.body.gender) && (req.body.gender != 0))) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a user
  const user = {
    fullName: req.body.fullName,
    gender: req.body.gender,
    dateOfBirth: req.body.dateOfBirth,
    job: req.body.job,
    group: req.body.group,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    online: 0
  };

  // Save user in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user."
      });
    });
};

