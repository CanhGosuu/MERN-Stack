var express = require("express");
var router = express.Router();

//@route  GET api/posts/
//@desc   Test posts route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));
module.exports = router;
