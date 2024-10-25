const Book = require("../models/bookModel");
const User = require("../models/userModel");

async function addBook(req, res) {
    try {
        const username = req.body.username;
        const user = await User.findOne({
            where: { username: username }
        });
        const output = await Book.create({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            user_id: user.user_id
        });
        res.status(200).json({
            message: `Book "${req.body.title}" has been created`,
            book: output
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

async function listUserBooks(req, res) {
    try {
        const username = req.body.username;

        const user = await User.findOne({
            where: { username: username }
        });

        const books = await Book.findAll({
            where: { user_id: user.user_id }
        });

        res.status(200).json(books);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

async function getAllBooks(req, res) {
    try {
        const allBooks = await Book.findAll({
            include: [{
                model: User,
                attributes: ['username']
            }]
        });
        res.status(200).json(allBooks);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {
    addBook,
    listUserBooks,
    getAllBooks
};