const express = require("express");
const router = express.Router();

const controller = require('../controllers/answer');

router.post("/", controller.create);
router.patch("/:id", controller.update); //Used to score an answer
router.get("/:user_id/:question_id", controller.get); //In reality would require security
router.delete("/:id", controller.delete);

module.exports = router;