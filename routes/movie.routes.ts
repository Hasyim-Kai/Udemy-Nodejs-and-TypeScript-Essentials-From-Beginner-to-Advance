const router = require("express").Router();
import movie from "../controllers/movie.controller";

router.get("/", movie.getAll)


export = router;