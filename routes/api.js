const express = require("express");
const ctrl = require("../controllers/books");
const isValidId = require("../middlewares/isValidId");

const router = express.Router();

router.get("/", ctrl.listBooks);

router.get("/:id", isValidId, ctrl.getBookById);

router.post("/", ctrl.addBook);

router.delete("/:id", isValidId, ctrl.removeBook);

router.put("/:id", isValidId, ctrl.updateBook);

module.exports = router;
