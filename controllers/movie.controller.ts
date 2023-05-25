import { Request, Response } from 'express';

const getAll = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ status: true, message: "Success" });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, error: "Something went wrong", });
  }
};

export = { getAll }