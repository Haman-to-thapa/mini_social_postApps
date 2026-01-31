import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authMiddleware from "./middleware/authMiddleware";
import authRoutes from './routes//auth'
import postRoutes from "./routes/post";
import path from "path";

dotenv.config();

const app: Application = express();


app.use(cors());
app.use(express.json());

connectDB();


app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authorized",
    user: req.user,
  });
});

app.use(
  "/uploads",
  express.static(path.join(__dirname, "../uploads"))
);


app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
