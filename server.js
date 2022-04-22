require('dotenv').config()
const { PORT } = process.env

const express = require('express'),
			{ json, urlencoded } = require('body-parser'),
			path = require('path'),
			staticAsset = require('static-asset')

const app = express()

app.use(json())
app.use(urlencoded({ extended: false }))

/* Set view engine */
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

/* Request logs middleware */
// app.use((req, res, next) => {
// 	console.log(`${req.method} request for ${req.url}`)
// 	next()
// })

app.use('/css',
	express.static(path.join(__dirname, 'node_modules', '@splidejs', 'splide', 'dist', 'css'))
)

/* Links hash */
app.use(staticAsset(path.join(__dirname, '/public')))

/* Define static folder on server */
app.use(express.static(path.join(__dirname, '/public/')))

/* Default variables middleware */
app.use(require('./middleware/default_variables'))

/* Define app routes */
app.use("/", require("./router"))

/* Start server */
app.listen(PORT || 3001, () => {
  console.log('Rostelecom Web app listening at port %s', PORT || 3001)
})