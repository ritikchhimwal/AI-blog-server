import Blog from "../models/BlogModel.js";
import { User } from "../models/UserModel.js";
import { getSentiment } from "./sentiment.js";

export async function createBlogPost({ description, genre, userId }) {
  const { success, sentiment } = await getSentiment(description);
  if (!success) {
    console.log(
      'Failed to fetch setiment hence adding the default sentiment "Neutral"'
    );
  } else {
    console.log(`Sentiment evaluated to be ${sentiment}`);
  }
  const blog = new Blog({
    description,
    genre,
    sentiment: sentiment?.toUpperCase(),
    userId,
  });
  await blog.save();
}

export async function fetchPosts(genreId) {
  const posts = await Blog.find(
    { genre: genreId },
    {
      createdAt: true,
      userId: true,
      description: true,
      genre: true,
      _id: true,
      sentiment: true,
    }
  );

  const uniqueUserIds = new Set();
  posts.forEach((post) => {
    uniqueUserIds.add(post.userId);
  });

  const users = await User.find(
    { _id: { $in: [...uniqueUserIds] } },
    { _id: true, name: true }
  );

  const userMap = new Map();
  users.forEach((user) => {
    userMap.set(user._id.toString(), user.name);
  });

  const postsResponse = [];
  posts.forEach((post) => {
    const postResponse = {
      postId: post._id,
      timestamp: post.createdAt,
      description: post.description,
      genre: post.genre,
      sentiment: post.sentiment,
      authorName: userMap.get(post.userId.toString()),
    };
    postsResponse.push(postResponse);
  });

  return postsResponse;
}
