const router = require("express").Router();
import movieRoutes from "./movie.routes";
import authRoutes from "./auth.routes";

router.use('/auth', authRoutes)
.use('/movie', movieRoutes)


export = router;