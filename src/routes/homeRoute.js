const router = require("express").Router();

const homeController = require("../controllers/homeController");

/**
 * HOME
 */

router.get("/", homeController.getHome);
router.post("/", homeController.postHome);
router.put("/", homeController.putHome);
router.delete("/", homeController.deleteHome);

module.exports = router;
