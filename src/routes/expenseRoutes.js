const express = require("express");
const router = express.Router();
const {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");
const verifyFirebaseToken = require("../middleware/verifyFirebaseToken");

router.get("/", verifyFirebaseToken, getExpenses);
router.post("/", verifyFirebaseToken, addExpense);
router.patch("/:id", verifyFirebaseToken, updateExpense);
router.delete("/:id", verifyFirebaseToken, deleteExpense);

module.exports = router;
