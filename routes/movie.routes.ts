const router = require("express").Router();
import movie from "../controllers/movie.controller";

router.get("/", movie.getAll)
  .get("/:id", movie.get)
  .post("/", movie.add);


export = router;