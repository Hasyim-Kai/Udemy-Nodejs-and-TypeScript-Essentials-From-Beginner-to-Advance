const router = require("express").Router();
import comment from "../controllers/comment.controller";
import { authenticate } from "../middlewares/auth";

router.get("/", authenticate, comment.getAll)
  .post("/", authenticate, comment.post)
  .get("/:id", authenticate, comment.get)
  .put("/:id", authenticate, comment.update)
  .delete("/:id", authenticate, comment.del)


export = router;