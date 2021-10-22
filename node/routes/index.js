var express = require('express');
var router = express.Router();

landpage = require("../controllers/landpage.js")


/* GET home page. */
router.get('/node/sha256', landpage.get_form);
router.post('/node/sha256', landpage.submit_form);

module.exports = router;
