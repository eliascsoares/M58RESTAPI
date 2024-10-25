const cors = require("cors");
const express = require("express");
const app = express();
const User = require("./db/models/userModel");
const Book = require("./db/models/bookModel");
const userRouter = require("./db/routes/userRoutes");
const bookRouter = require('./db/routes/bookRoutes');

require("./db/models/association");

require("dotenv").config();
app.use(cors())
app.use(express.json());

async function syncTables(){
    try {
        await User.sync({alter:true});
        await Book.sync({alter:true});
        console.log("Tables synchronized successfully");
    } catch (error) {
        console.error("Error syncing tables:", error);
        process.exit(1);
    }
}

const port = process.env.PORT || 5001;

app.use(userRouter);
app.use('/books', bookRouter);
app.get("/health", (req,res) => res.status(200).send("API is healthy"));

// Start server
syncTables().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(error => {
    console.error("Failed to start server:", error);
});