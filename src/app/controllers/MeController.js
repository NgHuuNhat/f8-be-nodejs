const Course = require('../models/Course')
const { listToObjectCustom } = require('../../util/ToObjectCustom')
const octicons = require('@primer/octicons')

class MeController {

    // //GET /me/stored/courses
    // storedCourses(req, res, next) {

    //     Promise.all([Course.find({}), Course.countDocumentsDeleted()])
    //         .then(([courses, deletedCount]) => {
    //             res.render('me/stored-courses', {
    //                 deletedCount,
    //                 courses: listToObjectCustom(courses),
    //                 chevronUpIcon: octicons['chevron-up'].toSVG(),
    //                 chevronDownIcon: octicons['chevron-down'].toSVG(),
    //             })
    //         })
    //         .catch(next)

    //     // Course.countDocumentsDeleted()
    //     //     .then(countDelete => console.log(countDelete))
    //     //     .catch()

    //     // Course.find({})
    //     //     .then(courses => {
    //     //         res.render('me/stored-courses', {
    //     //             courses: listToObjectCustom(courses)
    //     //         })
    //     //     })
    //     //     .catch(err => next(err))

    // }

    storedCourses(req, res, next) {
        let abc = Course.find({})

        if ('_sort' in req.query) {
            abc = abc.sort({
                // name: 'desc'
                [req.query.column]: req.query.type
            })
        }

        Promise.all([abc, Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: listToObjectCustom(courses),
                })
            })
            .catch(next)
    }

    //GET /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => {
                res.render('me/trash-courses', {
                    courses: listToObjectCustom(courses)
                })
            })
            .catch(err => next(err))
    }
}

module.exports = new MeController