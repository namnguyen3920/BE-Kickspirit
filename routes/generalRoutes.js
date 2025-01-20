const express = require('express');
const router = express.Router();
const generallController = require("../controllers/generallController");

router.get("/banner", generallController.getBannersImages);
router.get("/size", generallController.getSize);

module.exports = router;
