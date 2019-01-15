const router = require("express").Router();
const controller = require("../../controllers/controller.js");

router.get("/:id", controller.getOne);

module.exports = router;
