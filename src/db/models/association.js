const User = require('./userModel');
const Book = require('./bookModel');

User.hasMany(Book, { foreignKey: 'user_id' });
Book.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
    User,
    Book
};

