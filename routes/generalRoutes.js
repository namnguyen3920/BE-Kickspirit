const express = require('express');
const router = express.Router();
const {getBannersImages} = require("../controllers/generallController");

router.get("/banner", getBannersImages);

module.exports = router;
