const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Joi = require("joi");

dotenv.config();

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema and Model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

// Skill Schema and Model
const skillSchema = new mongoose.Schema({
  name: String,
  progress: { type: Number, min: 0, max: 100 }, // Ensures valid progress range
  userId: mongoose.Schema.Types.ObjectId, // Link skill to a specific user
});
const Skill = mongoose.model("Skill", skillSchema);

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

// Validation Schemas
const signupSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const skillSchemaValidation = Joi.object({
  name: Joi.string().required(),
  progress: Joi.number().min(0).max(100).required(),
});

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the SkillUp Tracker API!");
});

// Signup
app.post("/signup", async (req, res) => {
  const { error } = signupSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
});

// Add Skill
app.post("/add-skill", authenticateToken, async (req, res) => {
  const { error } = skillSchemaValidation.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const { name, progress } = req.body;
    const newSkill = new Skill({ name, progress, userId: req.user.id });
    await newSkill.save();
    res.status(201).json({ message: "Skill added successfully", skill: newSkill });
  } catch (error) {
    res.status(500).json({ error: "Failed to add skill" });
  }
});

// Fetch Skills
app.get("/skills", authenticateToken, async (req, res) => {
  try {
    const skills = await Skill.find({ userId: req.user.id });
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

// Update Skill
app.put("/skills/:id", authenticateToken, async (req, res) => {
  const { error } = Joi.object({ progress: Joi.number().min(0).max(100).required() }).validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const { id } = req.params;
    const { progress } = req.body;
    const updatedSkill = await Skill.findByIdAndUpdate(
      id,
      { progress },
      { new: true }
    );
    if (!updatedSkill) return res.status(404).json({ error: "Skill not found" });

    res.status(200).json({ message: "Skill updated successfully", skill: updatedSkill });
  } catch (error) {
    res.status(500).json({ error: "Failed to update skill" });
  }
});

// Delete Skill
app.delete("/skills/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSkill = await Skill.findByIdAndDelete(id);
    if (!deletedSkill) return res.status(404).json({ error: "Skill not found" });

    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete skill" });
  }
});


// Default Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
