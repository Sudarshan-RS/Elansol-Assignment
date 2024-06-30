const express = require ("express");
const { models, Model } = require("mongoose");
const router = express.Router();
const {getAllUsers} = require("../controllers/admin-controller");
const authMiddleware = require("../middlewares/auth-middleware");


router.route("/users").get(authMiddleware, getAllUsers);


module.exports = router;