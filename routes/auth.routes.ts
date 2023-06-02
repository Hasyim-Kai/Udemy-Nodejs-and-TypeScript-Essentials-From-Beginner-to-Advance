import auth from "../controllers/auth.controller";
import { createValidationFor, checkValidationResult } from "../middlewares/validator";
const router = require("express").Router();

router.post("/login", createValidationFor('login'), checkValidationResult, auth.login)
  .post("/register", createValidationFor('register'), checkValidationResult, auth.signUp);

export = router;