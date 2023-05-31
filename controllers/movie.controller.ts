import { Request, Response } from 'express';
import { Movie } from '../model/movie';

const getAll = async (req: Request, res: Response) => {
  try {
    // console.log(res.locals.user)
    const page = Number(req.query.page)
    const itemPerPage = Number(req.query.itemPerPage)
    if (!page || !itemPerPage) {
      return res.status(200).json({ status: false, message: 'Param must be exist' });
    }

    if (isNaN(page) || isNaN(itemPerPage)) {
      return res.status(200).json({ status: false, message: 'Param must be number' });
    }

    const moviesToSkip = (page - 1) * itemPerPage
    const data = await Movie.find().skip(moviesToSkip).limit(itemPerPage).exec();
    return res.status(200).json({ status: true, data });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ success: false, error: "Something went wrong", });
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
    const data = await Movie.updateOne({ _id: id }, req.body).exec();
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
    const data = await Movie.findByIdAndDelete(id).exec();
    return res.status(201).json({ status: true, data });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, error: "Something went wrong", });
  }
};

export = { getAll, get, add, update, del }