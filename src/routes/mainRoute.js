const router = require("express").Router();

const homeRouter = require("./homeRoute");
const movieRouter = require("./movieRoute");
const userRouter = require("./userRoute");

router.use("/", homeRouter);
router.use("/movies", movieRouter);
router.use("/users", userRouter);

module.exports = router;
