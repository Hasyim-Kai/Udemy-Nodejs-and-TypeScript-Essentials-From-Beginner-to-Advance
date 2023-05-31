const router = require("express").Router();
import comment from "../controllers/comment.controller";
import { authenticate } from "../middlewares/auth";

router.post("/", authenticate, comment.post)
  .get("/:id", authenticate, comment.getAllMovieComment)
  .put("/:id", authenticate, comment.update)
  .delete("/:id", authenticate, comment.del)


export = router;