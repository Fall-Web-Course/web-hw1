var express = require('express');
var router = express.Router();

landpage = require("../controllers/landpage.js")


/* GET home page. */
router.get('/sha256', landpage.get_form);
router.post('/sha256', landpage.submit_form);

router.get('/sha', landpage.get_by_hash)
router.post('/sha', landpage.set_by_phrase)

module.exports = router;
