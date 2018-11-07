var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

const validatePostInput = require("../../validation/post");

//@route  GET api/posts/
//@desc   Test posts route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Posts works" }));
module.exports = router;

//@route  GET api/posts
//@desc   Get all posts
//@access Public
router.get("/", (req, res, next) => {
  Post.find()
    .sort({ date: -1 })
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ noPostFounds: "No posts found." }));
});

//@route  GET api/posts/:id
//@desc   Get post by id
//@access Public
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ noPostFound: "No post for this ID." })
    );
});

//@route  POST api/posts/
//@desc   Create posts route
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    newPost.save().then(post => res.json(post));
  }
);
//@route  GET api/posts/:id
//@desc   Get post by id
//@access Public
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorrzed: "User not Authorized" });
          }
          //Delete
          post.remove().then(() => {
            res.json({ success: true });
          });
        })
        .catch(err => {
          res.status(404).json({ noPostFound: "Not post found" });
        });
    });
  }
);
//@route  Post api/posts/like/:id
//@desc   Like post
//@access Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyLike: "User already liked this post" });
          }
          post.likes.unshift({ user: req.user.id });
          post.save().then(post => res.json(post));
        })
        .catch(err => {
          res.status(404).json({ noPostFound: "Not post found" });
        });
    });
  }
);
//@route  Post api/posts/unlike/:id
//@desc   Unkike post
//@access Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notLike: "You has not like this post yet." });
          }
          const removeIndex = post.likes
            .map(value => value.user.toString())
            .indexOf(req.params.id);
          //Remove out array likes
          post.likes.splice(removeIndex, 1);
          //save
          post.save().then(post => res.json(post));
        })
        .catch(err => {
          res.status(404).json({ noPostFound: "Not post found." });
        });
    });
  }
);

//@route  Post api/posts/comment/:id
//@desc   Add commet to post
//@access Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    const { errors, isValid } = validatePostInput(req.body);
    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };
        //Add to comments array
        post.comments.unshift(newComment);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.json({ noPostFound: "Not post found." }));
  }
);

//@route  DELETE api/posts/comment/:id/:cmt_id
//@desc   Delete comment to post by cmt_id
//@access Private
router.delete(
  "/comment/:id/:cmt_id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //Check to see if comment exists
          if (
            post.comments.filter(
              cmt => cmt._id.toString() === req.params.cmt_id
            ).length === 0
          ) {
            return res
              .status(404)
              .json({ commentNotExist: "Comment is not exists" });
          }
          //Get remove
          const removeIndex = post.comments
            .map(value => value._id.toString())
            .indexOf(req.params.cmt_id);
          post.comments.splice(removeIndex, 1);
          post.save().then(post => res.json(post));
        })
        .catch(err => {
          res.status(404).json({ noPostFound: "Not post found." });
        });
    });
  }
);

module.exports = router;
