const { Router } = require("express"),
			RegionMiddleware = require("../../middleware/region"),
			{ Areas, Meta } = require("../../sequelize"),
			{ not_found, sort_obj_alph, getPhones } = require("../../common")

const router = new Router({ mergeParams: true })

router.route("/")
	.get(async ( req, res ) => {
		await getPhones(res)
		let params = res.locals
		
		Areas.findAll({ where: { show: true, type: "city", region_kladr_id: params.region.kladrId }, raw: true })
			.then(async areas => {
				if (!areas || areas.length == 0)
					return not_found(res)

				let defaultMeta = await Meta.findOne({ where: { default: true }, raw: true })
				let regionMeta = null

				if (params.region.meta)
					regionMeta = await Meta.findByPk(params.region.meta)

				let meta = regionMeta || defaultMeta

				if (meta) {
					params.head.title = meta.title
					params.head.description = meta.description
					params.head.keywords = meta.keywords
				}

				let sorted_areas = {}

				for (let area of areas) {
					let { shortName } = area
					if (!sorted_areas[shortName[0]]) sorted_areas[shortName[0]] = []
					sorted_areas[shortName[0]].push(area)
				}

				params.areas = sort_obj_alph(sorted_areas)

				res.locals.head.scripts.push({ src: "/js/region.chunk.min.js" })

				res.locals.head.links.push({ rel: "stylesheet", href: "/css/pages/homepage.css", type: "text/css" })

				res.render("region", params)
			})
	})

const { checkRegion } = new RegionMiddleware()

router.use("/:city", checkRegion("city"), require("./_city"))

module.exports = router
