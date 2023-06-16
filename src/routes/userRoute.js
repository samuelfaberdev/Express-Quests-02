const router = require("express").Router();

const userController = require("../controllers/userController");

/**
 * Movie
 */
const { hashPassword } = require("../auth.js");

// Route "/api/movies"
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.post("/", hashPassword, userController.postUsers);
router.put("/:id", hashPassword, userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
