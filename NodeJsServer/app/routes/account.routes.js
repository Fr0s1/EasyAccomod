module.exports = app => {
  const accounts = require("../controllers/account.controller.js");

  var router = require("express").Router();

  //Create a new account
  router.post("/", accounts.create);

  //Retrieve all accounts
  router.get("/", accounts.findAll);

  //Retrieve an account by username
  router.get("/username/:username", accounts.findOne);

  //Retrieve an account by username
  router.get("/username/:username", accounts.findByUsername);

  //Retrieve accounts by type
  router.get("/type/:type", accounts.findByType);

  //Delete an account by username
  router.delete("/:username", accounts.delete);

  //Update/Edit an account by username
  router.put("/:username", accounts.edit);

  // Retrieve account info by username
  router.get("/info/:username", accounts.getUserInfo)

  app.use('/api/accounts', router);
};
