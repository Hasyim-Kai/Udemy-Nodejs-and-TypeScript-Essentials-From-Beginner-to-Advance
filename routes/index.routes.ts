const router = require("express").Router();
import movieRoutes from "./movie.routes";
import authRoutes from "./auth.routes";
import commentRoutes from "./comment.routes";

router.use('/auth', authRoutes)
.use('/movie', movieRoutes)
.use('/comment', commentRoutes)


export = router;