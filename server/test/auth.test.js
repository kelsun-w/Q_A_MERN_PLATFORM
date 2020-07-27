const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../app');
const config = require('../config');
const { validUser } = require('./factories');
const User = mongoose.model('User');

process.env.TEST_SUITE = 'auth';

describe('auth endpoints', () => {
  let user;
  const username = {
    nonExisting: 'new',
    nonTrimmed: ' user ',
    invalid: 'user!$@',
    long: 'a'.repeat(33),
  };
  const password = {
    wrong: 'incorrect',
    short: 'aaa',
    long: 'a'.repeat(73)
  };
  const email = {
    nonExisting: 'new@test.com',
    nonTrimmed: ' user@test.com ',
    invalid: 'user@.com'
  }
  const studentNo = {
    nonTrimmed: ' xxxxxxxx ',
    incorrectLength: '12345',
    invalid: 'n2a45X-sdf'
  }
  const major = {
    nonTrimmed: ' xxxxxxxx '
  }

  beforeEach(async () => {
    user = validUser();
    await new User(user).save();
  });

  describe('/login', () => {
    test('rejects requests with no credentials', done => {
      request(app)
        .post('/api/login')
        .expect(res => {
          expect(res.body.errors).toBeDefined();
          res.body.errors.forEach(err => {
            expect(err.msg).toContain('required');
          });
        })
        .expect(422, done);
    });

    test('rejects requests with incorrect name', done => {
      request(app)
        .post('/api/login')
        .send({ ...user, username: username.nonExisting })
        .expect(res => {
          expect(res.body.message).toContain('user not found');
        })
        .expect(401, done);
    });

    test('reject requests with incorrect password', done => {
      request(app)
        .post('/api/login')
        .send({ ...user, password: password.wrong })
        .expect(res => {
          expect(res.body.message).toContain('invalid password');
        })
        .expect(401, done);
    });

    test('returns a valid auth token', done => {
      request(app)
        .post('/api/login')
        .send(user)
        .expect('Content-Type', /json/)
        .expect(res => {
          const { token } = res.body;
          const payload = jwt.verify(token, config.jwt.secret);
          expect(payload.user.username).toEqual(user.username);
        })
        .expect(200, done);
    });
  });

  describe('/register', () => {
    test('rejects requests with missing fields', done => {
      request(app)
        .post('/api/register')
        .expect(res => {
          expect(res.body.errors).toBeDefined();
          res.body.errors.forEach(err => {
            expect(err.msg).toContain('required');
          });
        })
        .expect(422, done);
    });

    test('rejects requests with blank name', done => {
      request(app)
        .post('/api/register')
        .send({ ...user, username: '' })
        .expect(res => {
          expect(res.body.errors).toBeDefined();
          expect(res.body.errors[0].msg).toContain('blank');
        })
        .expect(422, done);
    });

    test('rejects requests with blank password', done => {
      request(app)
        .post('/api/register')
        .send({ ...user, password: '' })
        .expect(res => {
          expect(res.body.errors).toBeDefined();
          expect(res.body.errors[0].msg).toContain('blank');
        })
        .expect(422, done);
    });

    test('rejects requests with a blank email', done => {
      request(app)
        .post('/api/register')
        .send({ ...user, email: '', username: username.nonExisting })
        .expect(res => {
          expect(res.body.errors).toBeDefined();
          expect(res.body.errors[0].msg).toContain('blank');
        })
        .expect(422, done);
    })

    test('rejects requests with a blank studentNo', done => {
      request(app)
        .post('/api/register')
        .send({ ...user, studentNo: '', username: username.nonExisting, email: email.nonExisting })
        .expect(res => {
          expect(res.body.errors).toBeDefined();
          expect(res.body.errors[0].msg).toContain('blank');
        })
        .expect(422, done);
    })

    test('rejects requests with a blank major', done => {
      request(app)
        .post('/api/register')
        .send({ ...user, major: '', username: username.nonExisting, email: email.nonExisting })
        .expect(res => {
          expect(res.body.errors).toBeDefined();
          expect(res.body.errors[0].msg).toContain('blank');
        })
        .expect(422, done);
    })

    test('rejects requests with non-trimmed values', done => {
      request(app)
        .post('/api/register')
        .send({ ...user, username: username.nonTrimmed, email: email.nonTrimmed })
        .expect(res => {
          expect(res.body.errors).toBeDefined();
          res.body.errors.forEach(err => {
            expect(err.msg).toContain('whitespace');
          });
        })
        .expect(422, done);
    });

    test('rejects requests with invalid name', done => {
      request(app)
        .post('/api/register')
        .send({ ...user, username: username.invalid })
        .expect(res => {
          expect(res.body.errors).toBeDefined();
          expect(res.body.errors[0].msg).toContain('invalid');
        })
        .expect(422, done);
    });

    test('rejects requests with invalid email', done => {
      request(app)
        .post('/api/register')
        .send({ ...user, email: email.invalid, username: username.nonExisting })
        .expect(res => {
          expect(res.body.errors).toBeDefined();
          expect(res.body.errors[0].msg).toContain('invalid');
        })
        .expect(422, done);
    })

    test('rejects requests with invalid studentNo', done => {
      request(app)
        .post('/api/register')
        .send({ ...user, studentNo: studentNo.invalid, username: username.nonExisting, email: email.nonExisting })
        .expect(res => {
          expect(res.body.errors).toBeDefined();
          expect(res.body.errors[0].msg).toContain('invalid');
        })
        .expect(422, done);
    })

    test('rejects requests with name that is too long', done => {
      request(app)
        .post('/api/register')
        .send({ ...user, username: username.long })
        .expect(res => {
          expect(res.body.errors).toBeDefined();
          expect(res.body.errors[0].msg).toContain('at most 32 characters long');
        })
        .expect(422, done);
    });

    test('rejects requests with password that is too short', done => {
      request(app)
        .post('/api/register')
        .send({ username: username.nonExisting, password: password.short })
        .expect(res => {
          expect(res.body.errors).toBeDefined();
          expect(res.body.errors[0].msg).toContain('at least 8 characters long');
        })
        .expect(422, done);
    });

    test('rejects requests with password that is too long', done => {
      request(app)
        .post('/api/register')
        .send({ username: username.nonExisting, password: password.long })
        .expect(res => {
          expect(res.body.errors).toBeDefined();
          expect(res.body.errors[0].msg).toContain('at most 72 characters long');
        })
        .expect(422, done);
    });

    test('rejects requests with studentNo that is not 10 digits', done => {
      request(app)
        .post('/api/register')
        .send({ ...user, studentNo: studentNo.incorrectLength, username: username.nonExisting, email: email.nonExisting })
        .expect(res => {
          expect(res.body.errors).toBeDefined();
          expect(res.body.errors[0].msg).toContain('must be 10 characters long');
        })
        .expect(422, done);
    });

    test('rejects requests with existing name and email', done => {
      request(app)
        .post('/api/register')
        .send(user)
        .expect(res => {
          expect(res.body.errors).toBeDefined();
          expect(res.body.errors).toHaveLength(2);
          res.body.errors.forEach(err => {
            expect(err.msg).toContain('already exists');
          });
        })
        .expect(422, done);
    });

    test('creates a new user and returns a valid auth token', done => {
      request(app)
        .post('/api/register')
        .send({ ...user, username: username.nonExisting, email: email.nonExisting })
        .expect(res => {
          const { token } = res.body;
          const payload = jwt.verify(token, config.jwt.secret);
          expect(payload.user.username).toEqual(username.nonExisting);
        })
        .expect(201, done);
    });
  });

});
