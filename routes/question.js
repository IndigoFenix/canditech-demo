const express = require("express");
const router = express.Router();

const controller = require('../controllers/question');

router.post("/", controller.create);
router.patch("/:id", controller.update);
router.get("/admin/:id", controller.getAdmin); //Would require security in reality
router.get("/candi/:id", controller.getCandi);
router.delete("/:id", controller.delete);

module.exports = router;