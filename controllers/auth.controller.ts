const { JWT_SECRET, EMAIL, EMAIL_PWD } = process.env;
import { User } from '../model/user';
import { compareSync, hashSync } from 'bcrypt';
import { Request, Response } from 'express';
import { Secret, decode, sign } from 'jsonwebtoken';
import { createTransport } from 'nodemailer';
import { getTransporter } from '../config/nodemailer';
import { getUserFromJwt } from '../utils/getUserFromJwt';

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

const verificationLink = `Afasuifh9u0oisaLKIS9801Q9241JN09Cjoij0HO008HOMn8b98H098IH98jkoJ09N9870NKKKJKHBLIYVGjvujblis9f8y09897102984flaoiwshfo99phpa890019j0o8hN7ug7SAGKniknojsydfbuijai27t489172g86b876g1hwbdu6dv81uy2vr7vbbuu6789at861b376bfdnmk`
const getVerification = async (req: Request, res: Response) => {
  try {
    const user: any = getUserFromJwt(req.headers.authorization)
    const transporter = await getTransporter()
    const subject = `Account Verification`
    const html = `<p style="color:#fd5aff;font-size:6em;font-weight:500;text-align:center;margin:0;">Hi from Healme</p>
     <p style="font-size:2em;text-align:center;color:#3D3D3D;">Click this link below to verify your Account!</p>
     <a target="_blank" href="localhost:4000/api/auth/${verificationLink}" style="font-size:2em;text-align:center;color:#3D3D3D;margin:2rem 0;">Click Here!</a>
     <p style="font-size:0.5em;text-align:center;color:#3D3D3D;">${verificationLink}</p>`

    const mailOptions = {
      from: EMAIL,
      to: user.email, subject, html
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) return res.status(200).json({ status: false, message: 'Something Went Wrong in API Server' })
      res.status(200).json({ status: true, message: 'Check Your Email to do the Verification' })
    });
  }
  catch (error) {
    res.status(400).json({ status: false, message: error })
  }
}

const verifyUser = async (req: Request, res: Response) => {
  try {
    const user: any = getUserFromJwt(req.headers.authorization)
    const foundExistingEmail = await User.findOne({ email: user.email }).exec();
    if (!foundExistingEmail) {
      return res.status(200).json({ status: false, message: "Email Doesnt exists", });
    }

    const data = await User.updateOne({ _id: user.id }, { verified: true }).exec();
    if (data.acknowledged) {
      return res.status(201).json({ status: true, message: `Verified!` });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, error: "Something went wrong", });
  }
};


export = { login, signUp, getVerification, verifyUser, verificationLink }