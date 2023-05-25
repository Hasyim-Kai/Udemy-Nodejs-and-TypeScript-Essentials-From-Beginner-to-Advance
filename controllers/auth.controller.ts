import { User } from '../model/user';
const { JWT_SECRET } = process.env;
import { compareSync, hashSync } from 'bcrypt';
import { Request, Response } from 'express';
import { Secret, sign } from 'jsonwebtoken';

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const foundExistingEmail = await User.findOne({ email }).exec()
    const isPasswordValid = foundExistingEmail ? compareSync(password, foundExistingEmail?.password) : false;
    if (foundExistingEmail && isPasswordValid) {
      const jwtPayload = { id: foundExistingEmail._id, name: foundExistingEmail.name, email }
      const token = sign(jwtPayload, JWT_SECRET as Secret, { expiresIn: "7d" })
      const data = { email: foundExistingEmail.email, name: foundExistingEmail.name }
      return res.status(200).json({ status: true, message: "Login Success", token, data });
    }
    return res.status(200).json({ status: false, message: "Wrong Email/Password", });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, error: "Something went wrong", });
  }
};

const signUp = async (req: Request, res: Response) => {
  try {
    const foundExistingEmail = await User.findOne({ email: req.body.email }).exec();
    if (foundExistingEmail) {
      return res.status(200).json({ status: false, message: "Email already exists", });
    }
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password: hashSync(password, 10) });
    const data = await newUser.save();
    return res.status(200).json({ status: true, message: "Sign Up Success", id: data._id });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, error: "Something went wrong", });
  }
};


export = { login, signUp }