require('dotenv').config()
global.__basedir = __dirname

const http = require('http')

const app = require('./app')
const log = require('./api/helpers/debug')


const port = process.env.PORT || 17300
const server = http.createServer(app)

server.listen(port, log('-', `Le server est en écoute sur http://localhost:${port}`))