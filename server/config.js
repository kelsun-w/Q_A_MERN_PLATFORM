module.exports = {
  port: process.env.PORT || 8080,
  db: {
    prod: process.env.DATABASE_URL || 'mongodb://localhost/reddit',
    test: 'mongodb://localhost/reddit_test',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500
    }
  },
  domain: process.env.RESTRICTED_DOMAIN,
  client_url: process.env.CLIENT_BASE_URL,
  jwt: {
    secret: process.env.JWT_SECRET || 'development_secret',
    expiry: '7d'
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  corsOptions : {
    origin: '*'
  }
};
