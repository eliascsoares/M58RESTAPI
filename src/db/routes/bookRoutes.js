const express = require('express');
const bookRouter = express.Router();
const { addBook, listUserBooks, getAllBooks } = require('../controllers/bookController');
const checkToken = require('../middleware/checkToken');

bookRouter.use(checkToken);
bookRouter.post('/add', addBook); 
bookRouter.get('/user', listUserBooks); 
bookRouter.get('/all', getAllBooks);

module.exports = bookRouter;
