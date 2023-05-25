// ======================
//  App initialization 
// ======================

require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const db = require("./models");
const middlewares = require("./middleware")
let port = process.env.PORT || 4000;
// const AppError = require("./utils/appError");
// const errorHandler = require("./utils/errorHandler");

// =====================
//  Use Middlewares
// =====================

middlewares(app);

// =====================
//  Sequelize DB Sync 
// =====================

db.sequelize.sync().then(() => {
  console.log("DB Synced");
}).catch((err: any) => {
  console.log("Failed to sync db: " + err.message);
});

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