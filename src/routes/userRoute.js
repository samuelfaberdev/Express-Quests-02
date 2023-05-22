const router = require("express").Router();

const userController = require("../controllers/userController");

/**
 * Movie
 */

// Route "/api/movies"
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.postUsers);
router.put("/:id", userController.updateUser);
router.delete("/", userController.deleteUsers);

module.exports = router;
