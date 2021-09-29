const express = require("express");
const router = express.Router();

const controller = require('../controllers/test');

router.post("/", controller.create);
router.patch("/:id", controller.update);
router.get("/:id", controller.get);
router.get("/", controller.all);
router.delete("/:id", controller.delete);

module.exports = router;