const { ObjectId } = require("mongodb");
const { expenseCollection } = require("../config/db");

//Get Expenses Details Functionality

exports.getExpenses = async (req, res) => {
  try {
    const userEmail = req.user.email;

    if (!userEmail) {
      return res.status(400).json({ error: "User email not found in token" });
    }

    const expenses = await expenseCollection
      .find({ userEmail })
      .sort({ date: -1 })
      .toArray();

    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

//Create or Add Expense Functionality With Validation

exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    const userEmail = req.user.email;

    if (!title || !amount || !category || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (title.trim().length < 3) {
      return res
        .status(400)
        .json({ error: "Title must be at least 3 characters long" });
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      return res
        .status(400)
        .json({ error: "Amount must be a number greater than 0" });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const today = new Date();
    if (parsedDate > today) {
      return res.status(400).json({ error: "Date cannot be in the future" });
    }

    const minDate = new Date("1970-01-01");
    if (parsedDate < minDate) {
      return res.status(400).json({ error: "Date is too far in the past" });
    }

    const expense = {
      title: title.trim(),
      amount: Number(amount),
      category,
      date: parsedDate,
      userEmail,
      createdAt: new Date(),
    };

    const result = await expenseCollection.insertOne(expense);

    res.status(201).json({
      message: "Expense added successfully",
      expenseId: result.insertedId,
      expense,
    });
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ error: "Failed to add expense" });
  }
};

//Update or Edit Functionality With Validation

exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userEmail = req.user.email;
    const { title, amount, category, date } = req.body;

    if (title.trim().length < 3) {
      return res
        .status(400)
        .json({ error: "Title must be at least 3 characters long" });
    }

    if (isNaN(amount) || Number(amount) <= 0) {
      return res
        .status(400)
        .json({ error: "Amount must be a number greater than 0" });
    }

    if (!category) {
      return res.status(400).json({ error: "Please select a category" });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const today = new Date();
    if (parsedDate > today) {
      return res.status(400).json({ error: "Date cannot be in the future" });
    }

    const minDate = new Date("1970-01-01");
    if (parsedDate < minDate) {
      return res.status(400).json({ error: "Date is too far in the past" });
    }

    const result = await expenseCollection.updateOne(
      { _id: new ObjectId(id), userEmail },
      {
        $set: {
          title: title.trim(),
          amount: Number(amount),
          category,
          date: parsedDate,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        error: "Expense not found or you are not authorized to update it",
      });
    }

    res.status(200).json({ message: "Expense updated successfully" });
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ error: "Failed to update expense" });
  }
};

//Expense Delete Functionality

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const userEmail = req.user.email;

    const result = await expenseCollection.deleteOne({
      _id: new ObjectId(id),
      userEmail: userEmail,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        error: "Expense not found or you are not authorized to delete it",
      });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ error: "Failed to delete expense" });
  }
};
