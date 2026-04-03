import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

import { connectDB } from "./src/config/connectMongo.js";
import authRoutes from "./src/routes/authRoutes.js";
import propertyRoutes from "./src/routes/propertyRoutes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

var PORT = process.env.PORT || 8000;

app.get("/api", (_, res) => {
  return res.send(`
        <html>
        <head>
        <title>This is from backend</title>
        </head>
        <body>Your Server is Listening on ${PORT}</body>
        </html>
        `);
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/property", propertyRoutes);

// Start Server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT} `);
    });
  } catch (error) {
    console.error("Server failed to start ", error);
  }
};

startServer();
