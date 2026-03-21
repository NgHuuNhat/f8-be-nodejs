const Course = require('../models/Course')
const { detailToObjectCustom } = require('../../util/ToObjectCustom')

class CoursesController {
    //GET /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('courses/show', {
                    course: detailToObjectCustom(course)
                })
            })
            .catch(err => next(err))
    }

    //GET /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    //POST /courses/store
    store(req, res, next) {
        const formData = { ...req.body }
        if (formData.thumbnail == '') formData.thumbnail = `https://i.ytimg.com/vi/${req.body.videoId}/maxresdefault.jpg`
        const course = new Course(formData)
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(err => next(err))
    }

    //GET /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: detailToObjectCustom(course)
            }))
            .catch(next)
    }

    //PUT /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    //DELETE /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect(req.get('referer') || '/me/stored/courses'))
            .catch(next)
    }

    //PATCH /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect(req.get('referer') || '/me/trash/courses'))
            .catch(next)
    }

    //DELETE-FORCED /courses/:id/force
    forcedDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect(req.get('referer') || '/me/trash/courses'))
            .catch(next)
    }


    //DELETE-ALL /courses/handle-form-actions
    handleFormActions(req, res, next) {
        // res.json(req.body)
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.checkboxItem } })
                    .then(() => res.redirect(req.get('referer') || '/me/stored/courses'))
                    .catch(next)
                break
            default:
                res.json({ message: 'Action is invalid!' })
        }
    }
}

module.exports = new CoursesController