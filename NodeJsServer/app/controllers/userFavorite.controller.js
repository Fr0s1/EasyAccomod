const db = require("../models");
const UserFavorite = db.userFavorites;
const Op = db.Sequelize.Op;

exports.createFavorite = (req, res) => {
    // Validate request
    if (!req.body.username || !req.body.postID) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a favorite
    const userFavorite = {
      accountUsername: req.body.username,
      PostPostID: req.body.postID,
    };
  
    // Save favorite in the database
    UserFavorite.create(userFavorite)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the user."
        });
      });
  };

//Retrieve all favorite by one user from the databse
exports.getAllUserFavorite = (req, res) => {
    const searchUsername = req.params.username;
  
    UserFavorite.findAll({ where: { accountUsername: searchUsername } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "No favorite with " + searchUsername + " found!"
        });
      });
}

//Retrieve all favorite to post from the database
exports.getAllPostFavorite = (req, res) => {
    const searchPostID = req.params.postID;
  
    UserFavorite.findAndCountAll({ where: { PostPostID: searchPostID } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "No favorite with " + searchPostID + " found!"
        });
      });
}