const { Router } = require('express')

const router = new Router()

router.route("/game")
  .get(( req, res ) => {
    const params = res.locals
    
    params.head.scripts.push({ src: "/js/game.chunk.min.js" })
    params.head.links.push({ rel: "stylesheet", type: "text/css", href: "/css/choices.min.css" }, { rel: "stylesheet", type: "text/css", href: "/css/main.css" }, { rel: "stylesheet", type: "text/css", href: "/css/dark-theme.css" })

	  res.render("game", params)

  })


module.exports = router
