const { body, validationResult } = require('express-validator/check');
const { login, createAuthToken } = require('../auth');
const User = require('../models/user');
const { json } = require('express');
const config = require('../config');

exports.login = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }
  login(req, res, next);
};

exports.restrictEmail = (req, res, next) => {
  const user = req.user;
  if (req.user.hd && req.user.hd === config.domain) {
    return res.json(user);
  }
  res.status(403).json({ message: 'restricted access' })
}

exports.register = async (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }

  try {
    const { username, password, email, studentNo, major } = req.body;
    const user = await User.create({ username, password, email, studentNo, major });
    const token = createAuthToken(user.toJSON());

    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.validate = method => {
  const errors = [
    body('username')
      .exists()
      .withMessage('is required')

      .isLength({ min: 1 })
      .withMessage('cannot be blank')

      .isLength({ max: 32 })
      .withMessage('must be at most 32 characters long')

      .custom(value => value.trim() === value)
      .withMessage('cannot start or end with whitespace')

      .matches(/^[a-zA-Z0-9_-]+$/)
      .withMessage('contains invalid characters'),

    body('password')
      .exists()
      .withMessage('is required')

      .isLength({ min: 1 })
      .withMessage('cannot be blank')

      .isLength({ min: 8 })
      .withMessage('must be at least 8 characters long')

      .isLength({ max: 72 })
      .withMessage('must be at most 72 characters long'),
  ];

  if (method === 'register') {

    errors.push(body('username')
      .custom(async username => {
        const exists = await User.countDocuments({ username });
        if (exists) throw new Error('name already exists');
      }));

    errors.push(body('email')
      .custom(async email => {
        const exists = await User.countDocuments({ email });
        if (exists) throw new Error('email already exists');
      })

      .exists()
      .withMessage('is required')

      .isLength({ min: 1 })
      .withMessage('cannot be blank')

      .custom(value => value.trim() === value)
      .withMessage('cannot start or end with whitespace')

      .isEmail()
      .withMessage('invalid email'));

    errors.push(body('studentNo')
      .exists()
      .withMessage('is required')

      .isLength({ min: 1 })
      .withMessage('cannot be blank')

      .isLength({ min: 10, max: 10 })
      .withMessage('must be 10 characters long')

      .custom(value => value.trim() === value)
      .withMessage('cannot start or end with whitespace')

      .matches(/^\d+$/)
      .withMessage('contains invalid characters'));

    errors.push(body('major')
      .exists()
      .withMessage('is required')

      .isLength({ min: 1 })
      .withMessage('cannot be blank')

      .custom(value => value.trim() === value)
      .withMessage('cannot start or end with whitespace')
    );
  }

  return errors;
};
