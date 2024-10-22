const cors = require("cors");
const express = require("express");
const app = express();
const User = require("./db/models/userModel");
const userRouter = require("./db/routes/userRoutes");

require("dotenv").config();

app.use(cors())
app.use(express.json());
// This tells express to handle input from JSON in the body rather than the older XML format

function syncTables(){
    User.sync({alter:true})
};

const port = process.env.PORT || 5001;

// const SQLconnection = require("./db/connection");
// SQLconnection();

app.use(userRouter)
app.get("/health", (req,res) => res.status(200).send("API is healthy"));

syncTables();

app.listen(port, () => {console.log(` Server is running on port ${port}`)})