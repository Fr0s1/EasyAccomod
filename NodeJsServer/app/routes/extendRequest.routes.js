module.exports = app => {
    const extendRequests = require("../controllers/extendRequest.controller.js");
  
    var router = require("express").Router();
  
    // Create a new extend duration request
    router.post("/", extendRequests.create);
  
    // Retrieve all request
    router.get("/", extendRequests.getAll);
  
    // Get one request with postID
    router.get("/:id", extendRequests.getOne);
  
    //Delete a request with postID
    router.delete("/:id", extendRequests.delete);
  
    app.use('/api/extend', router);
  };
  