import { Router } from "express";
import { authenticateMiddleware } from "../auth/JwtManager.js";
import {
  addCommentController,
  getAllCommentsController,
} from "../comment/CommentController.js";

const router = Router();
router.use(authenticateMiddleware);

/** adds a new comment to a given post  */
router.post("/add", addCommentController);

/** Fetches all the comments of a post */
router.get("/all", getAllCommentsController);

export default router;

/**
    Post {
        ...postDetails,
        comments: [
            {commentId: 1, message: "", username: "", timestamp: ""},
        ],
        replies: [
            {commentId: 3, replyId: 1, message: "", username: "", timestamp: ""}
        ]
    }
 */
