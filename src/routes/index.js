const newsRouter = require('./news')
const siteRouter = require('./site')
const coursesRouter = require('./courses')
const meRouter = require('./me')

function route(app) {
    //me
    app.use('/me', meRouter)

    //courses
    app.use('/courses', coursesRouter)

    //news
    app.use('/news', newsRouter)

    //home
    app.use('/', siteRouter)
}

module.exports = route