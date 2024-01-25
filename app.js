require("dotenv").config();
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const fileUpload = require("express-fileupload");
const PORT = process.env.PORT || 3000;
const connectDB = require("./config/db");

// app.use(
//   fileUpload({
//     useTempFiles: true,
//   })
// );
// Connect to MongoDB
connectDB();
console.log("code", process.env.JWT_SECRET);

// Middleware for parsing JSON requests (Express v4.16.0 and above)

app.use(express.json());

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - Token not provided" });
  }

  jwt.verify(token, "ritikbhushan", (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    req.user = user;
    next();
  });
};

// Use authentication middleware for protected routes
app.use("/profile", authenticateToken);

// Routes
app.use("/auth", authRoutes);
app.use("/event", eventRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
