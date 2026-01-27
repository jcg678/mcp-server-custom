const express = require("express");
const router = express.Router();

const ProjectController = require("../controllers/project");

router.post("/save", ProjectController.save);
router.get("/list", ProjectController.list);
router.get("/item/:id", ProjectController.item);

module.exports = router;