import { Request, Response } from 'express';
import { Comment } from '../model/comment';

const getAllMovieComment = async (req: Request, res: Response) => {
  try {
    const data = await Comment.find({ movie_id: req.params.id }).exec();
    return res.status(200).json({ status: true, data });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, error: "Something went wrong", });
  }
};

const post = async (req: Request, res: Response) => {
  try {
    const newComment = new Comment({ ...req.body });
    const data = await newComment.save();
    return res.status(201).json({ status: true, id: data._id });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, error: "Something went wrong", });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await Comment.updateOne({ _id: id }, req.body).exec();
    if (data.acknowledged) {
      return res.status(201).json({ status: true, message: `Edit Success` });
    }
    throw Error()
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, error: "Something went wrong", });
  }
};

const del = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await Comment.findByIdAndDelete(id).exec();
    return res.status(201).json({ status: true, data });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, error: "Something went wrong", });
  }
};

export = { getAllMovieComment, post, update, del }