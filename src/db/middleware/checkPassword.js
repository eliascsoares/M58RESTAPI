const {Router} = require("express");
const userRouter = Router();
const addUser = require("../controllers/addUser");
const hashPassword = require("../middleware/hashPassword");
const listAllUsers = require("../controllers/listAllUsers");
const User = require("../models/userModel")
userRouter.post("/addUser", hashPassword ,addUser);
userRouter.get("/listAllUsers", checkPassword, listAllUsers);
const { Op } = require('sequelize');
 
module.exports = userRouter;
 
const bcrypt = require("bcrypt");
async function checkPassword(req,res,next) {
    try {
        const userDetails = await User.findOne({
            where: {[Op.or]: [{email: req.body.email}, {username: req.body.username}]}}
        )
        if (!userDetails) {
            res.status(404).send("username/email and password do not match");
            return;
        }
        plainTextPassword = req.body.password;
        hashedPassword = userDetails.dataValues.password;
        const output = await bcrypt.compare(plainTextPassword,hashedPassword);
        console.log(output);
        if (!output) {
            res.status(404).send("username/email and password do not match");
            return;
        }
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}
 
module.exports = checkPassword;
 