var express = require('express');
var router = express.Router();

/* GET home page. */
router.route("/").get((req,res,next) =>{
  res.render("index",{URL : "localhost:3000"})
})

module.exports = router;
