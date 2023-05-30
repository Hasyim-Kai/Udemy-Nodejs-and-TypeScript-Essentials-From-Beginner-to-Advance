const router = require("express").Router();
import movie from "../controllers/movie.controller";

router.get("/", movie.getAll)
  .post("/", movie.add)
  .get("/:id", movie.get)
  .put("/:id", movie.update)
  .delete("/:id", movie.del)


export = router;