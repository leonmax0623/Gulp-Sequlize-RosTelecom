const { Router } = require('express')

const router = new Router()

router.route("/offers")
  .get(( req, res ) => {
	const params = res.locals
	params.head.scripts.push({ src: "/js/offers.chunk.min.js" })
    params.head.links.push({ rel: "stylesheet", type: "text/css", href: "/css/main.css" })

	res.render("offers", params)

  })


module.exports = router
