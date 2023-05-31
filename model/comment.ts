import { Schema, model } from "mongoose";

const CommentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Boolean,
    required: false,
    default: false,
  }
});

export const Comment = model("Comment", CommentSchema);