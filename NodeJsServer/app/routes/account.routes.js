module.exports = app => {
    const accounts = require("../controllers/account.controller.js");

    var router = require("express").Router();

    app.use('/api/accounts', router);
  };
