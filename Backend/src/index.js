import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Socket.IO configuration
const io = new Server(server, {
  cors: {
    origin: "*", // Allows all origins (for development)
    methods: ["GET", "POST"],
  },
});

// Use CORS for Express API (allows requests from all origins for testing)
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(`${process.env.MONGODB_URI}/users`)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a user schema
const userSchema = new mongoose.Schema({
  userId: { type: String, default: uuidv4 },
  email: { type: String, required: true, unique: true, lowercase: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

// Define a user model
const User = mongoose.model("User", userSchema, "userData");

// Secret key for JWT
const JWT_SECRET = process.env.ACCESS_TOKEN;

// Signup route
app.post("/signup", async (req, res) => {
  try {
    const { email, name, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, name, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error signing up", error });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token, name: user.name });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Socket.IO
const users = {};

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle user joining with a username
  socket.on("join", (username) => {
    users[socket.id] = username;
    console.log(`${username} has joined the chat.`);
    io.emit("user joined", {
      message: `${username} joined the chat`,
      username,
    });
  });

  // Handle chat messages
  socket.on("chat message", (msg) => {
    const username = users[socket.id];
    console.log(`Message from ${username}: ${msg}`);
    io.emit("chat message", { user: username, text: msg });
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    const username = users[socket.id];
    if (username) {
      io.emit("user left", { message: `${username} left the chat`, username });
      console.log(`${username} has left the chat.`);
      delete users[socket.id];
    }
  });
});

// Start server
const PORT = process.env.PORT || 8001;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
