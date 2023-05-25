import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import express from 'express';

module.exports = (app: any) => {

  app.use(cors())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true, }));
  app.use(morgan(`dev`));
  // app.use((req: Request, res: Response, next: NextFunction) => {
  //   console.log('from Global Middleware!');
  //   next();
  // });

  // app.use((req: Request, res: Response, next: NextFunction) => {
  //   const error = createError(404);
  //   console.log(error)
  //   next(error);
  // });

  // app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  //   res.status(error.statusCode).json({ message: error.message });
  // });

}