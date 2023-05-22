const router = require("express").Router();

const movieController = require("../controllers/movieController");

/**
 * Movie
 */

// Route "/api/movies"
router.get("/", movieController.getMovies);
router.get("/:id", movieController.getMovieById);
router.post("/", movieController.postMovies);
router.put("/:id", movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);

module.exports = router;
