const express = require("express");
const router = express.Router();
const {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

router.get("/", getExpenses);
router.post("/", addExpense);
router.patch("/:id", updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;
