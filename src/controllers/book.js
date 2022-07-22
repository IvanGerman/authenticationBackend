const Book = require('../models/Book');
  

module.exports.getBooks = async function(req, res) {

  try {
    const allBooks = await Book.find();
    res.status(200).json(allBooks);
  } catch(err) {
    res.status(404).json({
      message: 'an error occured!'
    })
  }     
};

module.exports.postBook = async function(req, res) {

// check is this book already in DB 
  const isBookInDB = await Book.findOne({name: req.body.name});
  if (isBookInDB) {
    res.status(409).json({
      message: 'this book is already in DB!'
    })
  } else { //create new book
    const book = new Book({
      name: req.body.name
    });

    try {
      await book.save();
      res.status(201).json(book);
    } catch(err) {
      res.status(400).json({
        message: 'error occured'
      })
    }
  }
}
