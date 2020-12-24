const db = require("../models");
const Notification = db.notifications;
const Op = db.Sequelize.Op;

exports.createNotification = (req, res) => {
    // Validate request
    if (!req.body.postName || !req.body.accountUsername || !req.body.type) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a notification
    const notification = {
      accountUsername: req.body.accountUsername,
      postName: req.body.postName,
      type: req.body.type,
      postID: req.body.postID
    };
  
    // Save notification in the database
    Notification.create(notification)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating notification."
        });
      });
  };

//Retrieve all notification for one user from the databse
exports.getUserNotification = (req, res) => {
    const searchUsername = req.params.username;
  
    Notification.findAll({ 
        where: { 
          accountUsername: searchUsername 
        },
        order: [
          ['createdAt', 'DESC']
        ],
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error!"
        });
      });
}