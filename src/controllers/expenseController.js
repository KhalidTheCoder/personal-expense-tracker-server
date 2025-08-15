const { expenseCollection } = require("../config/db");

//Get Expenses Details Functionality
exports.getExpenses = async (req, res) => {
  try {
    const userEmail = req.query.userEmail;

    if (!userEmail) {
      return res.status(400).json({ error: "User email is required" });
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

//Create or Add Expense Functionality

exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category, date, userEmail } = req.body;

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
      userEmail: userEmail || null,
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

exports.updateExpense = (req, res) => {
  res.send("Add a new expense");
};

exports.deleteExpense = (req, res) => {
  res.send(`Delete expense with ID ${req.params.id}`);
};
