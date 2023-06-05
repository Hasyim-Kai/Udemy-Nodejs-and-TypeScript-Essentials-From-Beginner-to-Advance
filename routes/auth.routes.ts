import auth from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth";
import { createValidationFor, checkValidationResult } from "../middlewares/validator";
const router = require("express").Router();

router.post("/login", createValidationFor('login'), checkValidationResult, auth.login)
  .post("/register", createValidationFor('register'), checkValidationResult, auth.signUp)
  .get("/get-verification", authenticate, auth.getVerification)
  .get("/" + auth.verificationLink, authenticate, auth.verifyUser);

export = router;