const users = require('./controllers/users');
const posts = require('./controllers/posts');
const comments = require('./controllers/comments');
const communities = require('./controllers/communities');
const { jwtAuth, postAuth, commentAuth, googleAuth } = require('./auth');
const router = require('express').Router();
const passport = require('passport');
const config = require('./config');
const { upload } = require('./storage');
const { handleUpload } = require('./controllers/file');
router.get('/auth/google', googleAuth);
router.get(config.google.callbackURL, passport.authenticate('google', { session: false }), users.restrictEmail);

router.post('/login', users.validate(), users.login);
router.post('/register', users.validate('register'), users.register);

router.get('/getToken', jwtAuth, users.getToken);
router.put('/user', jwtAuth, users.updateUser);
router.param('post', posts.load);
router.get('/posts', posts.list);
router.get('/posts/:category', posts.listByCategory);
router.get('/post/:post', posts.show);
router.post('/posts', [jwtAuth, posts.validate], posts.create);
router.delete('/post/:post', [jwtAuth, postAuth], posts.destroy);
router.get('/post/:post/upvote', jwtAuth, posts.upvote);
router.get('/post/:post/downvote', jwtAuth, posts.downvote);
router.get('/post/:post/unvote', jwtAuth, posts.unvote);
router.get('/user/:user', posts.listByUser);

router.param('comment', comments.load);
router.post('/post/:post', [jwtAuth, comments.validate], comments.create);
router.delete('/post/:post/:comment', [jwtAuth, commentAuth], comments.destroy);

router.param('community', communities.load);
router.post('/community', jwtAuth, communities.create);
router.get('/community/:community', communities.show);
router.get('/communities', communities.listAll);
router.post('/community/:community/rule', jwtAuth, communities.addRule);
router.get('/community/:community/rule/:rule', jwtAuth, communities.removeRule);
router.get('/community/:community/member/:user', jwtAuth, communities.addMember);

router.get('/community/:community/ban/:user', jwtAuth, communities.banUser);
router.get('/community/:community/mod/:user', jwtAuth, communities.modUser);
router.delete('/community/:community', jwtAuth, communities.destroy);
router.get('/communities/:user', communities.ListByUser);

router.post('/img/ua', jwtAuth, handleUpload('u_avatar'), users.addAvatar);
router.get('/img/ua/:user', users.getAvatar);

router.post('/img/ca/:community', jwtAuth, upload.single('c_avatar'), communities.addAvatar);
router.get('/img/ca/:community', communities.getAvatar);

module.exports = app => {
  app.use('/api', router);

  app.get('*', (req, res) => {
    res.status(404).json({ message: 'not found' });
  });

  app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
      return res.status(400).json({ message: 'bad request' });
    }
    next(err);
  });
};
