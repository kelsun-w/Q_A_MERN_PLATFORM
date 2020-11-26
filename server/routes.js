const users = require('./controllers/users');
const posts = require('./controllers/posts');
const comments = require('./controllers/comments');
const communities = require('./controllers/communities');
const reports = require('./controllers/reports');
const { jwtAuth, postAuth, commentAuth, googleAuth } = require('./auth');
const router = require('express').Router();
const passport = require('passport');
const config = require('./config');
const { handleUpload } = require('./controllers/file');

router.get('/auth/google', googleAuth);
router.get(config.google.callbackURL, passport.authenticate('google', { session: false }), users.restrictEmail);

router.post('/login', users.validate(), users.login);
router.post('/register', users.validate('register'), users.register);

router.get('/getToken', jwtAuth, users.getToken);
router.put('/user', jwtAuth, users.updateUser);
router.get('/getuser/:user', users.getUser);
router.get('/getsave/:user', jwtAuth, users.getSavedList);
router.post('/user/delete/:user', [jwtAuth, users.passwordCheckDelete], users.deleteUser);
router.get('/search/user/query=:query', users.searchUsers);

router.param('post', posts.load);
router.get('/posts', posts.list);
router.get('/search/post/query=:query', posts.searchPosts);
router.get('/posts/:category', posts.listByCategory);
router.get('/post/:post', posts.show);
router.post('/posts', [jwtAuth, posts.validate], posts.create);
router.delete('/post/:post', [jwtAuth, postAuth], posts.destroy);
router.get('/post/:post/upvote', jwtAuth, posts.upvote);
router.get('/post/:post/downvote', jwtAuth, posts.downvote);
router.get('/post/:post/unvote', jwtAuth, posts.unvote);
router.get('/user/:user', posts.listByUser);
router.get('/save/:post', jwtAuth, users.savePost);

router.param('comment', comments.load);
router.post('/post/:post', [jwtAuth, comments.validate], comments.create);
router.get('/post/:postid/:comment/upvote', jwtAuth, comments.upvote);
router.get('/post/:postid/:comment/downvote', jwtAuth, comments.downvote);
router.get('/post/:postid/:comment/unvote', jwtAuth, comments.unvote);
router.delete('/post/:post/:comment', [jwtAuth, commentAuth], comments.destroy);
router.post('/post/:post/:commentid', [jwtAuth, comments.validate], comments.addChild);
router.delete('/post/:post/:parentid/:comment', [jwtAuth, commentAuth], comments.removeChild);

router.param('community', communities.load);
router.post('/community', jwtAuth, communities.create);
router.put('/community/:community', jwtAuth, communities.update);
router.get('/community/:community', communities.show);
router.get('/communities', communities.listAll);
router.post('/community/:community/rule', jwtAuth, communities.addRule);
router.get('/community/:community/rule/:rule', jwtAuth, communities.removeRule);
router.get('/community/:community/member/:user', jwtAuth, communities.addMember);

router.post('/community/:community/ban', jwtAuth, communities.addUserBan);
router.get('/community/:community/ban/:user', jwtAuth, communities.removeUserBan);
router.get('/community/:community/mod/:user', jwtAuth, communities.modUser);
router.delete('/community/:community', jwtAuth, communities.destroy);
router.get('/communities/:user', communities.ListByUser);

router.param('report', reports.load);
router.post('/report', jwtAuth, reports.create);
router.put('/report/:report', jwtAuth, reports.update);
router.get('/report/:report', reports.show);
router.get('/reports', reports.listAll);
router.get('/reports/:community', reports.listByCommunity);
router.delete('/report/:report', jwtAuth, reports.destroy);

//File uploading and serving
router.post('/img/ua', jwtAuth, handleUpload('u_avatar'), users.addAvatar);
router.get('/img/ua/:user', users.getAvatar);

router.post('/img/ca/:community', jwtAuth, handleUpload('c_avatar'), communities.addAvatar);
router.get('/img/ca/:community', communities.getAvatar);
// -----

//Admin api --------------------------------------------------------------
router.get('/admin/users', users.getAll);
router.get('/admin/users/:id', users.getById);
router.post('/admin/users', users.validate('register'), users.register);
router.put('/admin/users/:id', users.updateUser);
router.delete('/admin/users/:user', users.deleteUser);

router.get('/admin/posts', posts.getAll);
router.get('/admin/posts/:post', posts.getById);
router.delete('/admin/posts/:post', posts.destroy);

router.get('/admin/communities', communities.getAllById);
router.get('/admin/communities/:id', communities.getById);
router.post('/admin/communities', communities.createByAdmin);
router.put('/admin/communities/:id', communities.updateById);
router.delete('/admin/communities/:id', communities.deleteById);
// -----------------------------------------------------------------------

module.exports = app => {
  app.use('/api', router);

  app.get('*', (req, res) => {
    res.status(404).json({ message: 'No route found' });
  });

  app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed') {
      return res.status(400).json({ message: 'Bad request' });
    }
    next(err);
  });
};
