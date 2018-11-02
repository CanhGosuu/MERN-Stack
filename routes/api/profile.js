var express = require("express");
var router = express.Router();

//@route  GET api/profile/
//@desc   Test profile route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));
module.exports = router;
