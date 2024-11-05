const express = require("express");
const userController = require('../controllers/userController')

const router = express.Router();


router.route("/User").post(userController.createNewUser).get((req,res)=>res.send("hello world from user"));


module.exports = router