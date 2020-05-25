const express = require('express')
const path = require('path')
const hbs = require('hbs')
require('./db/mongoose')
const userRouter = require('./routers/user')
const galleryRouter = require('./routers/gallery')

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(galleryRouter)

const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

module.exports = app