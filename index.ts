// ======================
//  App initialization 
// ======================

import { connect } from "mongoose";
import { connectDB } from "./config/mongodb";

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const middlewares = require("./middlewares")
let port = process.env.PORT || 4000;
// const AppError = require("./utils/appError");
// const errorHandler = require("./utils/errorHandler");

// =====================
//  Use Middlewares
// =====================

middlewares(app);

// =====================
//  Mongo DB Sync 
// =====================

connectDB();

// =====================
//  Initialize & Use Routes
// =====================

const routes = require('./routes/index.routes.ts');
app.use('/api', routes)

// =====================
//  Start Server
// =====================

app.listen(port, () => {
  console.log("Aplikasi kita Tersambung di localhost:" + port);
});