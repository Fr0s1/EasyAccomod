const db = require("../models");
const UserFavorite = db.userFavorites;
const Op = db.Sequelize.Op;

exports.createFavorite = (req, res) => {
    // Validate request
    if (!req.body.accountUsername || !req.body.PostPostID) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a favorite
    const userFavorite = {
      accountUsername: req.body.accountUsername,
      PostPostID: req.body.PostPostID,
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

exports.checkUserFavorite = (req, res) => {
  const searchPostID = req.body.PostPostID;
  const searchUsername = req.body.accountUsername;

  UserFavorite.findAndCountAll({ where: { PostPostID: searchPostID, accountUsername: searchUsername} })
    .then(data => {
      if (data.count == 1)
        res.send({liked: true});
      else 
        res.send({liked: false});
    })
    .catch(err => {
      res.status(500).send({
        message: "Error!"
      });
    });
}

exports.deleteFavorite = (req, res) => {
  if (!req.body.accountUsername || !req.body.PostPostID) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a favorite
  UserFavorite.destroy({
    where: { accountUsername: req.body.accountUsername, PostPostID: req.body.PostPostID }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "favorite was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete favorite. Maybe favorite was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete favorite"
      });
    });
}