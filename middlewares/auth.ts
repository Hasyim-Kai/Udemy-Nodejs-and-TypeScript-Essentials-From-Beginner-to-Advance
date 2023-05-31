import { Request, Response, NextFunction } from 'express';
import { Secret, verify } from 'jsonwebtoken';

export function authenticate(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Not Authenticated" });
  }

  try {
    // Bearer <token>>
    const token = req.headers.authorization.split(" ")[1];
    const data = verify(token, process.env.JWT_SECRET as Secret);
    res.locals.user = data;
    next()
  } catch (error) {
    return res.status(401).json({ error: "Not Authenticated" });
  }
}