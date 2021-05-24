const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const upload = require("../middleware/upload");
const db = require("../models");
const users = db.users
const path = require('path')


let routes = (app) => {
  router.get("/", homeController.getHome);

  router.get("/camera" ,(req,res)=>{
    res.sendFile(path.join(`${__dirname}/../views/camera.html`))
  })

  router.post("/upload", upload.single("file"), uploadController.uploadFiles);

  router.get("/users",(req,res)=>{
    users.findAll().then(result=>{
      res.send(result)
    })
    
  })

  return app.use("/", router);
};

module.exports = routes;
