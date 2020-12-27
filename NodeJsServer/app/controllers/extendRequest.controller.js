const db = require("../models");
const ExtendRequest = db.extendRequests;
const Op = db.Sequelize.Op;

exports.createRequest = (req, res) => {
    // Validate request
    if (!req.body.postID || !req.body.newExpireTime || !req.body.price) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a notification
    const extendRequest = {
      postID: req.body.postID,
      newExpireTime: req.body.newExpireTime,
      price: req.body.price
    };
  
    // Save notification in the database
    ExtendRequest.create(extendRequest)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating request."
        });
      });
  };

//Retrieve all notification for one user from the databse
exports.getAll = (req, res) => {
    var condition = req.body

    ExtendRequest.findAll({ where: condition })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving requests."
            });
        });
}

exports.getOne = (req, res) => {
    const id = req.params.id;

    ExtendRequest.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving request with id=" + id
            });
        });
}

exports.delete = (req, res) => {
    const id = req.params.id;
    
    ExtendRequest.destroy({
        where: { postId: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Request was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete request with id=${id}. Maybe request was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete request with id=" + id
        });
    });
}