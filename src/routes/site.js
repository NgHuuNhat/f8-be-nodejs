const express = require('express')
const router = express.Router()
const siteController = require('../app/controllers/SiteController')

//search page
router.get('/search', siteController.search)

//home page
router.get('/', siteController.index)

module.exports = router