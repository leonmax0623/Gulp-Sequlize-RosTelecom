const { Router } = require('express')

const router = new Router()

router.route('/internet')
	.get(( req, res ) => {
		const params = res.locals

		params.head.scripts.push({ src: "/js/internet.chunk.min.js" })
		params.head.links.push({ rel: "stylesheet", type: "text/css", src: "/js/internet.chunk.min.js" })

		res.render('internet', params)
	})

module.exports = router