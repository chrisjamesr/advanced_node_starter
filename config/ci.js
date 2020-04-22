require('dotenv').config();

module.exports = {
    googleClientID: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    mongoURI: 'mongodb://127.0.0.127017/blog_ci',
    cookieKey: process.env.COOKIE_KEY,
    githubClientID: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    redisUrl: 'redis://127.0.0.1:6379'
};
