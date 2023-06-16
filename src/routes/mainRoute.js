const router = require("express").Router();

const homeRouter = require("./homeRoute");
const movieRouter = require("./movieRoute");
const userRouter = require("./userRoute");
const loginRouter = require("./loginRoute.js");

router.use("/", homeRouter);
router.use("/movies", movieRouter);
router.use("/users", userRouter);
router.use("/login", loginRouter);

module.exports = router;
