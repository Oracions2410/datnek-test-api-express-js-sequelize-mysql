const express = require('express')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const languageRoutes = require('./api/routes/language')
const { API_ROOT_PATH, LANGUAGE_ROUTES_ROOT_PATH } = require('./api/constants/url_paths')

const port = process.env.PORT
app.use('/ping', (req, res) => {
    res.send(`Le server est en écoute sur ${req.protocol}://${req.host}:${port}`)
})

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


const log = require('./api/helpers/debug')
log('path', API_ROOT_PATH + LANGUAGE_ROUTES_ROOT_PATH)

app.use(API_ROOT_PATH, languageRoutes)

module.exports = app