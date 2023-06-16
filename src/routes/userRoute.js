const router = require("express").Router();

const userController = require("../controllers/userController");

/**
 * user
 */

const {
  hashPassword,
  verifyToken,
} = require("../middlewares/authMiddleware.js");

// Route "/api/users"

/** Public Routes */
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);

/** Authentication Wall */
router.use(verifyToken);
/** Authentication Wall */

/** Private Routes */
router.post("/", hashPassword, userController.postUsers);
router.put("/:id", hashPassword, userController.updateUser);
router.delete("/", userController.deleteUsers);

module.exports = router;
