const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/userModel");

async function checkToken(req,res,next) {
    try{
        const secretKey = process.env.JWT_SECRET_KEY;
        const token = req.header("Authorization").replace("Bearer ", ""); 
        const  decodedToken = jwt.verify(token, secretKey);
        console.log(decodedToken);
        const username = decodedToken.username;
        const findResponse = await User.findOne({where:{
            username: username
        }});
        console.log(findResponse);
        if (!findResponse) {
            throw new Error("User no longer in database access denied")
        } else {
            req.body.username = username;
            req.body.email = findResponse.email;
            next();
        }
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = checkToken;