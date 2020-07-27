const faker = require('faker');

exports.validUser = () => ({
  username: faker.name.firstName(),
  password: 'password',
  email: faker.internet.email(),
  studentNo: '6031305044',
  major: 'Software Engineering'
});

exports.validPost = (author, category) => ({
  title: faker.lorem.sentence(),
  url: faker.internet.url(),
  category,
  author,
  type: 'link'
});
