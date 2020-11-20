const path = require('path');
const { body, validationResult } = require('express-validator/check');
const { login, createAuthToken } = require('../auth');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const config = require('../config');

exports.getToken = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  const token = createAuthToken(user);
  res.json(token);
};

exports.updateUser = async (req, res, next) => {
  let id = (req.user && req.user.id) || req.params.id;
  let user = await User.findById(id);

  let list = Object.entries(req.body);
  let update = {};
  for (var i = 0; i < list.length; i++) {
    const [key, value] = list[i];
    if (key === 'current_password') continue; //Skip. Don't add current_password to doc
    else if (key === 'password') {
      //It's a password update request. Authenticate password before adding to doc.
      try {
        const result = await bcrypt.compare(req.body.current_password, user.password)
        //Password did not match. Exit without updating doc
        if (!result)
          return res.status(401).json({ message: 'Incorrect password. Try again.' });
      } catch (err) {
        return res.status(500).json({ message: 'Something went wrong' })
      }
    };
    update[key] = value;
  };

  user.set(update);
  user
    .save()
    .then(() => res.json(user))
    .catch(err => res.status(500).json({ message: 'Something went wrong while updating' }));
};

exports.getUser = async (req, res, next) => {
  const user = await User.findOne({ username: req.params.user });
  if (!user) return res.status(404).json({ message: 'No user found' });

  return res.status(200).json({ success: true, user });
};

exports.searchUsers = (req, res) => {
  const query = req.params.query;

  User
    .find({ "username": new RegExp(query, 'i') },
      function (error, list) {
        if (error) return res.status(422).json({ success: false, error });

        return res.json({ success: true, list });
      })
    .catch(err => {
      res.status(500).json({ success: false, error: err });
    });
};

exports.passwordCheck = async (req, res, next) => {
  const doer = await User.findById(req.body.id);
  if (!doer) return res.status(404).json({ message: 'Doer No user found' });
  if (!doer.admin) {
    //Requestor is not admin. Password check required
    const check = await bcrypt.compare(req.body.password, doer.password);
    if (!check) return res.status(401).json({ message: 'Incorrect password. Try again' })
  }
  next()
};

exports.passwordCheckDelete = async (req, res, next) => {
  const doer = await User.findById(req.body.id);
  if (!doer) return res.status(404).json({ message: 'Doer No user found' });

  const check = await bcrypt.compare(req.body.password, doer.password);
  if (!check) return res.status(401).json({ message: 'Incorrect password. Try again' })
  
  next()
};

exports.savePost = async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.user.id });
    if (!user) return json.status(404).json({ success: false, message: 'No such user found' });

    const result = await user.savePost(req.post);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

exports.getSavedList = async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.params.user }, 'saved -communities', (err, doc) => {
      if (err) return next(err);
      const result = doc.populate('saved',)
      res.status(200).json({ success: true, doc: [...result.saved] });
    });
    if (!user) return json.status(404).json({ success: false, message: 'No such user found' });
  } catch (err) {
    next(err);
  }
}

exports.deleteUser = async (req, res, next) => {
  const object = await User.findById(req.params.user);
  if (!object) return res.status(404).json({ message: 'No user found' });

  User
    .deleteOne({ _id: object.id })
    .then(doc => {
      return res.json(doc)
    })
    .catch(err => {
      return res.status(500).json({ message: 'Something went wrong' })
    })
};

exports.addAvatar = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) res.status(404).json({ message: 'No user found' });
  user.picture = req.file.path;
  user
    .save()
    .then(doc => {
      res.json({ message: 'Avatar updated successfully', doc });
    })
};

exports.getAvatar = async (req, res, next) => {
  const id = req.params.user;
  const user = await User.findById(id);
  if (!user) res.status(404).json({ message: 'No user found' });

  res.sendFile(path.join(__dirname, '\\..\\', user.picture));
};

exports.login = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array({ onlyFirstError: true });
    return res.status(422).json({ errors });
  }
  login(req, res, next);
};

exports.restrictEmail = async (req, res, next) => {
  const profile = req.user;
  if (profile.hd && profile.hd === config.domain) {
    if (profile.email_verified) {
      await User.findOne({ email: profile.email }, (err, doc) => {
        if (err) return res.json({ err })
        if (!doc) {
          return res
            .status(200)
            .cookie(
              'google_jwt',
              createAuthToken(profile)
            )
            .redirect(config.client_url + '/signup');
        }
        //user already have an account registered
        return res.redirect(config.client_url + '/login');
      })
    }
  }
  res.status(403).redirect(config.client_url + '/unauthorised');
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

    return res.status(201).json({ token });
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

exports.getAll = async (req, res, next) => {
  const users = await User.find().sort('username');
  res.json({ data: users });
};

exports.getById = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) res.status(404).json({ message: 'User not found' });

  res.json({ data: user });
};