module.exports = app => {
    const users = require("../controllers/user.controller.js");

    var router = require("express").Router();

    // Create a new User
    router.post("/", users.create);

    // Retrieve all users
    router.get("/", users.findAll);

    // Retrieve a single User with id
    router.get("/id/:id", users.findOne);

    // Retrieve a single User with phone number
    router.get("/phone/:phoneNumber", users.findPhoneNumber);

    // Retrieve a single User with email
    router.get("/email/:email", users.findEmail);

    // Retrieve a single User with idCard number
    router.get("/idCard/:idCard", users.findIdCard);

    //Update/edit an user with id
    router.put("/:id", users.edit);

    //Delete an user with id
    router.delete("/:id", users.delete);

    app.use('/api/users', router);
  };
