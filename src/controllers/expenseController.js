exports.getExpenses = (req, res) => {
  res.send("Get all expenses");
};

exports.addExpense = (req, res) => {
  res.send("Add a new expense");
};
exports.updateExpense = (req, res) => {
  res.send("Add a new expense");
};

exports.deleteExpense = (req, res) => {
  res.send(`Delete expense with ID ${req.params.id}`);
};