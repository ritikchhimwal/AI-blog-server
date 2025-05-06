import { addComment, fetchAllCommentsByPostId } from "./CommentService.js";

export async function addCommentController(req, resp) {
  // endpoint: /comment/add?postId=289403
  const { postId } = req.query;
  const { comment } = req.body;
  if (!postId) {
    return resp
      .status(400)
      .json({ message: "Can't comment on a invalid post" });
  }
  if (!comment?.trim()) {
    return resp.status(400).json({ message: "Please enter comment" });
  }
  const userId = req.userId;
  const statusCode = await addComment(comment.trim(), userId, postId);
  resp.status(statusCode).json({
    message:
      statusCode === 201
        ? "Comment added successfully"
        : statusCode === 400
        ? "Invalid blog"
        : "Internal server error",
  });
}

export async function getAllCommentsController(req, resp) {
  const { postId } = req.query;
  if (!postId) {
    return resp
      .status(400)
      .json({ message: "Can't comment on a invalid post" });
  }
  const response = await fetchAllCommentsByPostId(postId);
  resp.status(200).json(response);
}
