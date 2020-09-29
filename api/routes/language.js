const router = require('express').Router()

const { LANGUAGE_ROUTES_ROOT_PATH } = require('../constants/url_paths')
const { create, findAll, findById, updateAll, update, remove } = require('../controllers/language')

router.post(LANGUAGE_ROUTES_ROOT_PATH, create)
router.get(LANGUAGE_ROUTES_ROOT_PATH, findAll)
router.get(`${LANGUAGE_ROUTES_ROOT_PATH}/:languageId`, findById)
router.put(`${LANGUAGE_ROUTES_ROOT_PATH}/:languageId`, updateAll)
router.patch(`${LANGUAGE_ROUTES_ROOT_PATH}/:languageId`, update)
router.delete(`${LANGUAGE_ROUTES_ROOT_PATH}/:languageId`, remove)

module.exports = router