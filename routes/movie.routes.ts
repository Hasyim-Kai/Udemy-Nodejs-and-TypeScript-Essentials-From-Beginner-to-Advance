const router = require("express").Router();
import movie from "../controllers/movie.controller";
import { authenticate } from "../middlewares/auth";

router.get("/", authenticate, movie.getAll)
  .post("/", authenticate, movie.add)
  .get("/:id", authenticate, movie.get)
  .put("/:id", authenticate, movie.update)
  .delete("/:id", authenticate, movie.del)


export = router;