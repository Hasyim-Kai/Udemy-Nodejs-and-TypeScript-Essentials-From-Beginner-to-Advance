const router = require("express").Router();
import movieRoutes from "./movie.routes";

router.use('/movie', movieRoutes)


export = router;