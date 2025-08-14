const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB } = require("./config/db");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/expenses", expenseRoutes);


app.get("/", (req, res) => {
  res.send("Personal Expense Tracker API is running");
});


connectDB().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
}).catch(err => {
  console.error("❌ Failed to connect to DB", err);
});
