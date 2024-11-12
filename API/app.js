const express = require('express')
const app = express()
const cors = require('cors')

const routerUser = require('./src/routers/usuarioRouter')

app.use(express.json())
app.use(cors())

app.use(routerUser)

module.exports = app