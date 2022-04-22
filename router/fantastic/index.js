const { Router } = require('express')

const router = new Router()

router.route("/fantastic")
  .get(( req, res ) => {
	const params = res.locals
	params.head.scripts.push({ src: "/js/fantastic.chunk.min.js" })
    params.head.links.push({ rel: "stylesheet", type: "text/css", href: "/css/main.css" })

	res.render("fantastic", params)

  })


module.exports = router
