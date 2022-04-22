const { Router } = require('express')

const router = new Router()

router.route("/transformer")
  .get(( req, res ) => {
	const params = res.locals
	params.head.scripts.push({ src: "/js/transformer.chunk.min.js" })
    params.head.links.push({ rel: "stylesheet", type: "text/css", href: "/css/main.css" }, { rel: "stylesheet", type: "text/css", href: "/css/dark-theme.css" })

	res.render("transformer", params)

  })


module.exports = router
