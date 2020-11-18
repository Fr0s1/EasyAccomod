module.exports = app => {
  const accounts = require("../controllers/account.controller.js");

  var router = require("express").Router();

  //Create a new account
  router.post("/", accounts.create);

  //Retrieve all accounts
  router.get("/", accounts.findAll);

  //Retrieve an account by ID
  router.get("/id/:id", accounts.findOne);

  //Retrieve an account by username
  router.get("/username/:username", accounts.findByUsername);

  //Retrieve accounts by type
  router.get("/type/:type", accounts.findByType);

  //Delete an account by id
  router.delete("/:id", accounts.delete);

  //Update/Edit an account by id
  router.put("/:id", accounts.edit);

  app.use('/api/accounts', router);
};
