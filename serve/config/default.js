module.exports = {
    port: 3000,
    session: {
        secret: 'news',
        key: 'news',
        cookie: {
            httpOnly: true,
            secure:   false,
            maxAge:   365 * 24 * 60 * 60 * 1000,
        }
    },
    mongodb: 'mongodb://localhost:27017/news'
};