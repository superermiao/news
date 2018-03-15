module.exports = {
    port: 3000,
    session: {
        secret: 'mynews',
        key: 'mynews',
        maxAge: 2592000000
    },
    mongodb: 'mongodb://localhost:27017/news'
}