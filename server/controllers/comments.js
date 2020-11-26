const { body, validationResult } = require('express-validator/check');
const Comment = require('../models/comment');
const Post = require('../models/post');

exports.load = async (req, res, next, id) => {
  try {
    req.comment = await Comment.findById(id);
    if (!req.comment) return next(new Error('comment not found'));
  } catch (err) {
    return next(err);
  }
  next();
};

exports.create = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  try {
    const post = await req.post.addComment(req.user.id, req.body.comment);
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const post = await req.post.removeComment(req.params.comment);
    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.upvote = async (req, res) => {
  const comment = await req.comment.vote(req.user.id, 1);
  const post = await Post.findById(req.params.postid);
  res.status(201).json(post);
};

exports.downvote = async (req, res) => {
  const comment = await req.comment.vote(req.user.id, -1);
  const post = await Post.findById(req.params.postid);
  res.status(201).json(post);
};

exports.unvote = async (req, res) => {
  const comment = await req.comment.vote(req.user.id, 0);
  const post = await Post.findById(req.params.postid);
  res.status(201).json(post);
};

exports.addChild = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  try {
    const result = await req.post.addCommentChild(req.user.id, req.body.comment, req.params.commentid);
    if (!result.success) return res.status(500).json({ message: 'Something went wrong' });

    res.status(201).json(result.doc);
  } catch (err) {
    next(err);
  }
};

exports.removeChild = async (req, res, next) => {
  try {
    const post = await req.post.removeCommentChild(req.params.parentid, req.params.comment);
    res.json(post);
  } catch (err) {
    next(err);
  }
}

exports.validate = [
  body('comment')
    .exists()
    .withMessage('is required')

    .isLength({ min: 1 })
    .withMessage('cannot be blank')

    .isLength({ max: 2000 })
    .withMessage('must be at most 2000 characters long')
];

