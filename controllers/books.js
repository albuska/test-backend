const { nanoid } = require("nanoid");
const { httpError, ctrlWrapper } = require("../helpers");
const books = require("../books.json");

const listBooks = async (req, res) => {
  res.status(200).json(books);
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  const result = books.find((book) => book.id === Number(id));
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(result);
};

const addBook = async (req, res) => {
  const { body } = req;
  const newBook = {
    id: nanoid(),
    author: body.author,
    title: body.title,
    reviews: body.reviews,
    year: body.year,
    isNew: body.isNew,
  };
  books.push(newBook);
  res.status(201).json(newBook);
};

const removeBook = async (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((book) => book.id === Number(id));
  if (index === -1) {
    throw httpError(404, "Not found");
  }
  books.splice(index, 1);
  res.status(200).json({ message: "book deleted" });
};

const updateBook = async (req, res) => {
  const { body, params } = req;
  const { id } = params;

  const index = books.findIndex((book) => book.id === Number(id));

  if (index === -1) {
    throw httpError(404, "Not found");
  }

  books[index] = {
    ...books[index],
    ...body,
  };

  res.status(200).json(books[index]);
};

module.exports = {
  listBooks: ctrlWrapper(listBooks),
  getBookById: ctrlWrapper(getBookById),
  addBook: ctrlWrapper(addBook),
  removeBook: ctrlWrapper(removeBook),
  updateBook: ctrlWrapper(updateBook),
};
