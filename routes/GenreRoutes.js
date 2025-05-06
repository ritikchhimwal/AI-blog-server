import { Router } from "express";
import { authenticateMiddleware } from "../auth/JwtManager.js";

const router = Router();

export const genres = [
  { id: "politics", title: "Politics" },
  { id: "science", title: "Science" },
  { id: "history", title: "History" },
  { id: "technology", title: "Technology" },
  { id: "art", title: "Art" },
  { id: "literature", title: "Literature" },
  { id: "sports", title: "Sports" },
  { id: "music", title: "Music" },
  { id: "travel", title: "Travel" },
  { id: "food", title: "Food" },
];

router.get("/all", authenticateMiddleware, (_, resp) => {
  resp.status(200).json({ genres });
});

export default router;
