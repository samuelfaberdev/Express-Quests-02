const router = require("express").Router();

/**
 * Login
 */

const {
  verifyPassword,
  getUserByEmailWithPasswordAndPassToNext,
  getToken,
} = require("../middlewares/authMiddleware.js");

// Route "/api/login"

router.post(
  "/",
  getUserByEmailWithPasswordAndPassToNext,
  verifyPassword,
  getToken
);

module.exports = router;
