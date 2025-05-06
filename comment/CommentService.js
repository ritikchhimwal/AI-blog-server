import Blog from "../models/BlogModel.js";
import { User } from "../models/UserModel.js";

/**
 * Adds a new comment for the given post by the given userId
 * @param {string} comment
 * @param {string} userId
 * @param {string} postId
 */
export async function addComment(comment, userId, postId) {
  const commentInstance = { text: comment, userId, createdAt: Date.now() };

  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: commentInstance } },
      { _id: 1 }
    );

    if (!blog) {
      console.log(
        `Failed to add new comment: blog with id: ${postId} is not found`
      );
      return 400;
    }
    return 201;
  } catch (error) {
    console.log("Failed adding comment due to server error");
    return 500;
  }
}

export async function fetchAllCommentsByPostId(postId) {
  try {
    const { comments } = await Blog.findById(postId, {
      comments: 1,
    });
    const userIdNameMap = new Map();
    comments.forEach((comment) => {
      userIdNameMap.set(comment.userId.toString(), "");
    });
    const uniqueUserIds = userIdNameMap.keys();
    const users = await User.find(
      { _id: { $in: [...uniqueUserIds] } },
      { _id: 1, name: 1 }
    );
    users.forEach((user) => {
      userIdNameMap.set(user._id.toString(), user.name);
    });

    const commentsResponse = [];

    comments.forEach((comment) => {
      const commentResponse = {
        commentText: comment.text,
        createdAt: comment.createdAt,
        username: userIdNameMap.get(comment.userId) ?? "Anonymous",
      };
      commentsResponse.push(commentResponse);
    });

    return {
      message: "Comments fetched successfully",
      comments: commentsResponse,
    };
  } catch (error) {
    console.log(`Error fetching comments for post : ${postId}`);
    return {
      message: error.message,
    };
  }
}
