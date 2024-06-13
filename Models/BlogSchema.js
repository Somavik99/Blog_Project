import mongoose from "mongoose";

// Providing blog schema

const Blog_Schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  //   Setting ref to the user

  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  name: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Blog", Blog_Schema);
