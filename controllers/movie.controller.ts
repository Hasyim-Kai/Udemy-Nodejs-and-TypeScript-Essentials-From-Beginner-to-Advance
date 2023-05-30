import { Request, Response } from 'express';
import { Movie } from '../model/movie';

const getAll = async (req: Request, res: Response) => {
  try {
    const data = await Movie.find().exec();
    return res.status(200).json({ status: true, data });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, error: "Something went wrong", });
  }
};

const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await Movie.findById(id).exec();
    return res.status(201).json({ status: true, data });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, error: "Something went wrong", });
  }
};

const add = async (req: Request, res: Response) => {
  try {
    const newMovie = new Movie({ ...req.body });
    const data = await newMovie.save();
    return res.status(201).json({ status: true, id: data._id });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, error: "Something went wrong", });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await Movie.updateOne({ id }, req.body).exec();
    console.log(data.acknowledged)
    return res.status(201).json({ status: true, data });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, error: "Something went wrong", });
  }
};

const del = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await Movie.findByIdAndDelete(id).exec();
    return res.status(201).json({ status: true, data });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, error: "Something went wrong", });
  }
};

export = { getAll, get, add, update, del }