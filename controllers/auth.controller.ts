"use strict";
const { JWT_SECRET } = process.env;
const { User } = require('../models')
import { compareSync, hashSync } from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { Secret, sign } from 'jsonwebtoken';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const foundExistingEmail = await User.findOne({ where: { email } })
    const isPasswordValid = compareSync(password, foundExistingEmail.password);
    if (foundExistingEmail && isPasswordValid) {
      const jwtPayload = { id: foundExistingEmail.id, name: foundExistingEmail.name, email, role: foundExistingEmail.role }
      const token = sign(jwtPayload, JWT_SECRET as Secret, { expiresIn: "1d" })
      return res.status(200).json({ status: true, message: "Login Success", data: foundExistingEmail, token });
    }
    return res.status(200).json({ status: false, message: "Wrong Email/Password", });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, error: "Something went wrong", });
  }
};

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const foundExistingEmail = await User.findOne({ where: { email } })
    if (foundExistingEmail) {
      return res.status(200).json({ status: false, message: "Email already exists", });
    } else {
      const newUser = await User.create({ name, email, password: hashSync(password, 10) });
      return res.status(200).json({
        status: true,
        message: "Sign Up Success",
        data: newUser.id
      });
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, error: "Something went wrong", });
  }
};


export = { login, signUp }