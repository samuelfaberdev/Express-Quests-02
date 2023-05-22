const router = require("express").Router();

const movieController = require("../controllers/movieController");

/**
 * Movie
 */

// Route "/api/movies"
router.get("/", movieController.getMovies);
router.get("/:id", movieController.getMovieById);
router.post("/", movieController.postMovies);
router.post("/", movieController.putMovies);
router.post("/", movieController.deleteMovies);

module.exports = router;
