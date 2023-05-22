const router = require("express").Router();

const homeController = require("../controllers/homeController");

/**
 * HOME
 */

router.post("/", homeController.postHome);
router.get("/", homeController.getHome);
router.put("/", homeController.putHome);
router.delete("/", homeController.deleteHome);

module.exports = router;
