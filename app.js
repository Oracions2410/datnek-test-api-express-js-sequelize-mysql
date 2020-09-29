const express = require('express')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const languageRoutes = require('./api/routes/language')
const { API_ROOT_PATH, LANGUAGE_ROUTES_ROOT_PATH } = require('./api/constants/url_paths')

const port = process.env.PORT
app.use('/ping', (req, res) => {
    res.send(`Le serveur est en cours d\'exécution sur <span style="font-weight: bold;color: coral">${req.protocol}://${req.host}:${process.env.PORT}</span>`)
})

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// const log = require('./api/helpers/debug')
// log('path', API_ROOT_PATH + LANGUAGE_ROUTES_ROOT_PATH)

app.use(API_ROOT_PATH, languageRoutes)


// Errors Management
app.use((req, res, next) => {
    const error = new Error('404 Resource not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        message: error.message
    })
})

module.exports = app