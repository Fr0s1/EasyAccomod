module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", users.create);

  // Retrieve all users
  router.get("/", users.findAll);

  //Update/edit an user with id
  router.put("/:id", users.edit);

  //Delete an user with id
  router.delete("/:id", users.delete);

  app.use('/api/users', router);
};
