//backend\server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.use(express.json());

// we turning cors on for the frontend
app.use(
  cors({
    origin: "http://localhost:5173", // frontend url
    credentials: true, // allow cookies etc
  })
);

// connecting to the server using Url from the .env file
// setting up the structure to use in the database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  amount: { type: Number, default: 0 }, // default is zero
  expenses: [
    {
      category: String,
      note: String,
      cost: Number,
      date: String,
      icon: String,
      createdAt: { type: Date, default: Date.now }, // set the created date
    },
  ],
});

// we are hashing the password here before saveing aka "pre"
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // we are only hashing if it is modified
    const hashedPassword = await bcrypt.hash(this.password, 10); // adding salt to make it delicious
    this.password = hashedPassword; // updating the password with hashed one
  }
  next(); // to next user
});

const User = mongoose.model("User", userSchema); // user model create

// to get users (for postmen debugging)
// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: "Error retrieving users" });
//   }
// });

// "Create" new users and check if they exist before adding
app.post("/users", async (req, res) => {
  try {
    const { name, password, amount } = req.body; // get data

    if (!name || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name, password, amount });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: "Error creating user" });
  }
});

// actually logging in
app.post("/login", async (req, res) => {
  const { name, password } = req.body; // get credentails

  if (typeof name !== "string" || typeof password !== "string") {
    console.log("Invalid input types");
    return res.status(400).json({ message: "Invalid input format" });
  }

  const cleanName = name.trim();
  const cleanPassword = password.trim();

  // not empty
  if (!cleanName || !cleanPassword) {
    console.log("Missing credentials");
    return res.status(400).json({ message: "Name and password required" });
  }

  try {
    const user = await User.findOne({ name: cleanName }); // find user by name
    if (!user) {
      console.log("User not found:", cleanName);
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // we are compairing the entered password to the hashed one
    const isMatch = await bcrypt.compare(cleanPassword, user.password);

    if (!isMatch) {
      console.log("Password mismatch for:", cleanName);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // create jwt token
    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // change this to set how long the user can stay logged in
    );

    // response with token and user data
    res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        amount: user.amount,
        expenses: user.expenses,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
});

// middleware to verify jwt
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", ""); // get token from auth
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify token using secret key in env
    req.user = decoded; // put decoded user information to request
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

// Get profile and expenses
app.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId); // find user by id
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // I put these to prevent caching
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    //send profile data
    res.json({
      _id: user._id,
      name: user.name,
      amount: user.amount,
      expenses: user.expenses,
    });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving user profile" });
  }
});

// Add an expense
app.post("/add-expense", verifyToken, async (req, res) => {
  const { category, note, cost, date, icon } = req.body;

  try {
    const user = await User.findById(req.user.userId); // find
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newExpense = { category, note, cost, date, icon }; // create new expense object
    user.expenses.push(newExpense); // add that to that user's expenses array
    user.amount -= cost; // subtract the expense from the user's balance

    // Save the updated user document
    await user.save();

    res.json({ message: "Expense added successfully", user });
  } catch (err) {
    console.error("Error adding expense:", err);
    res.status(500).json({ message: "Error adding expense" });
  }
});

// route for updating user balance
app.put("/update-amount/:id", verifyToken, async (req, res) => {
  const { amount } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findById(id); // find user
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.amount = amount; // Update amount
    await user.save(); // save

    res.json({ message: "Amount updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error updating amount" });
  }
});

// Delete an expense
app.delete("/delete-expense/:expenseId", verifyToken, async (req, res) => {
  const { expenseId } = req.params;

  try {
    const user = await User.findById(req.user.userId); // find user by id
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // find the expense index uisng expense id
    const expenseIndex = user.expenses.findIndex(
      (e) => e._id.toString() === expenseId
    );

    if (expenseIndex === -1) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // get cost before removal
    const expenseCost = user.expenses[expenseIndex].cost;

    // update amount
    user.amount += expenseCost;

    // remove the expense
    user.expenses.splice(expenseIndex, 1);

    // and save
    await user.save();

    // we return this
    res.json({
      message: "Expense deleted successfully",
      user: {
        _id: user._id,
        name: user.name,
        amount: user.amount,
        expenses: user.expenses,
      },
    });
  } catch (err) {
    console.error("Server error deleting expense:", err);
    res.status(500).json({
      message: "Error deleting expense",
      error: err.message,
    });
  }
});

// starting the servef
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
