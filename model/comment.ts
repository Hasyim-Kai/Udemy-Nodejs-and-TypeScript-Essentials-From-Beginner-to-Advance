import { Schema, model } from "mongoose";

const CommentSchema = new Schema({ 
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  movie_id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: false,
    default: new Date(),
  }
});

export const Comment = model("Comment", CommentSchema);