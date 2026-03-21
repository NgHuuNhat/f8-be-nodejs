const Course = require('../models/Course')
const { listToObjectCustom } = require('../../util/ToObjectCustom')

class SiteController {
    //GET /home
    async index(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('home', {
                    courses: listToObjectCustom(courses)
                })
            })
            .catch(err => next(err))
    }

    //GET /search
    search(req, res) {
        res.render('search')
    }
}

module.exports = new SiteController