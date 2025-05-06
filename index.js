import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectToMongoDB } from "./connection.js";
import AuthRouter from "./routes/AuthRoutes.js";
import BlogRouter from "./routes/BlogRouter.js";
import CommentRouter from "./routes/CommentRoutes.js";
import GenresRouter from "./routes/GenreRoutes.js";
import { getSentiment } from "./blog/sentiment.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8001;

app.use(cors({
  origin: "https://ai-blog-client-three.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));
app.use(express.json());

connectToMongoDB();

app.use("/auth", AuthRouter);
app.use("/blog", BlogRouter);
app.use("/comment", CommentRouter);
app.use("/genres", GenresRouter);

app.listen(PORT, () => {
  console.log(`app is listening at port ${PORT}`);
});

getSentiment();
