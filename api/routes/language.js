const router = require('express').Router()

const { LANGUAGE_ROUTES_ROOT_PATH } = require('../constants/url_paths')
const { create, findAll, findById, updateAll, update, remove } = require('../controllers/language')

router.post(LANGUAGE_ROUTES_ROOT_PATH, create)
router.get(LANGUAGE_ROUTES_ROOT_PATH, findAll)
router.get(`${LANGUAGE_ROUTES_ROOT_PATH}/:id`, findById)
router.put(`${LANGUAGE_ROUTES_ROOT_PATH}/:id`, updateAll)
router.patch(`${LANGUAGE_ROUTES_ROOT_PATH}/:id`, update)
router.delete(`${LANGUAGE_ROUTES_ROOT_PATH}/:id`, remove)

module.exports = router