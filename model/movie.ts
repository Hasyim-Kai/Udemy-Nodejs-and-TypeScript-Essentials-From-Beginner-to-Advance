import { Schema, model } from "mongoose";

const MovieSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  isReleased: {
    type: Boolean,
    required: false,
    default: false,
  },
});

export const Movie = model("Movie", MovieSchema);