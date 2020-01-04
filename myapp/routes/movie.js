var express = require('express');
var router = express.Router();
var path = require('path');

/* GET movie page. */
router.get('/', function (req, res, next) {
    // res.render('zhixiao_index.html');
    res.sendFile(path.join(__dirname, '../movie/index.html'));
});

module.exports = router;