import auth from "../controllers/auth.controller";
const router = require("express").Router();

router.post("/login", auth.login)
  .post("/register", auth.signUp);

export = router;