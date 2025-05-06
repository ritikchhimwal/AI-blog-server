import { model, Schema } from "mongoose";

export const SENTIMENT = {
  POSITIVE: "POSITIVE",
  NEGATIVE: "NEGATIVE",
  NEUTRAL: "NEUTRAL",
};

const BlogSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    // TODO: update it's reference to UserSchema
    type: String,
    required: true,
  },
  sentiment: {
    type: String,
    default: SENTIMENT.NEUTRAL,
  },
  genre: {
    type: String,
    required: true,
    default: "politics",
  },
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      userId: {
        // TODO: update it's reference to UserSchema
        type: String,
        required: true,
      },
    },
  ],
});

const Blog = model("Blog", BlogSchema);

export default Blog;

/*
100 posts => 50 comments 

50*4*100 = 20000 bytes

blog {
  id: 394003
  description: "Some description",
  createdAt: 389348923,
  userId: 390203,
  genre: "politics"
}

comment {
  text: "Some comment",
  userId: 940033,
  blogId: 394003 // 4bytes
}

comment {
  text: "Some comment 2",
  userId: 37823,
  blogId: 394003 // 4bytes
}
  */

/**


blog {
  id: 394003
  description: "Some description",
  createdAt: 389348923,
  userId: 390203,
  genre: "politics"
  comments: [
    {
      text: "Some comment 2",
      userId: 37823,
    }
  ]
}

 */
