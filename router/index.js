const { Router } = require("express"),
			{ Op } = require("sequelize"),
			{ Areas, Meta, refresh } = require("../sequelize"),
			{ sort_obj_alph, sort_by_field, searchQuery, getPhones } = require("../common"),
			RegionMiddleware = require("../middleware/region")

const router = new Router()

router.route("/")
	.get(async (req, res) => {
		await getPhones(res)

		res.locals.homepage = true

		const { only_body } = req.query

		Areas.findAll({ where: { show: true, type: "region" }, raw: true })
			.then(async unsorted_db_areas => {
				let db_areas = []
				for (let i in unsorted_db_areas) {
					let area = unsorted_db_areas[i]
					if (area) {
						let params = { where: { type: 'city', region_kladr_id: area.kladrId, show: true }, raw: true }

						if (!area.tariffs) params.where.tariffs = { [Op.not]: null }

						let areas = await Areas.findAll(params)
						
						if (areas.length > 0 || area.tariffs) {
							db_areas.push(area)
						}
					}
				}
				Meta.findOne({ where: { default: true } })
					.then(meta => {
						if (meta) {
							res.locals.head.title = meta.title
							res.locals.head.description = meta.description
							res.locals.head.keywords = meta.keywords
						}
						let areas = {}
						
						for (let area of db_areas) {
							let { shortName } = area
							if (!areas[shortName[0]]) areas[shortName[0]] = []
							areas[shortName[0]].push(area)
						}

						res.locals.head.scripts.push({ src: "/js/homepage.chunk.min.js" })
						
						res.locals.head.links.push({ rel: "stylesheet", href: "/css/pages/homepage.css", type: "text/css" })
						
						res.render(only_body ? 'layout/area_selector' : 'main', { areas: sort_obj_alph(areas) })
					})
			})
	})
	.post(async (req, res) => {
		let { region_kladr_id, keyword } = req.query

		if (keyword) {
			let params = {
				where: searchQuery(Op, keyword, 'fullName'),
				raw: true
			}
			params.where.type = 'city'
			params.where.show = true 

			Areas.findAll(params)
				.then(async areas => {
					let result = []

					for (let { distictKladrId, regionKladrId, key, name, tariffs } of areas) {
						let area = {}

						if (distictKladrId)
							area.district = await Areas.findOne({ where: { kladr_id: distictKladrId } }).then(({ name }) => name)

						let add = true
						if (regionKladrId) {
							let region = await Areas.findOne({ where: { kladr_id: regionKladrId } })

							if (!tariffs && !region.tariffs) add = false

							area.region = region.name
						}

						area.link = `/${key}`
						area.name = name

						if (add)
							result.push(area)
					}

					res.render('components/livesearch_list', { areas: result })
				})
		} else if (region_kladr_id) {
			let region = await Areas.findOne({ where: { kladr_id: region_kladr_id }, raw: true })
	
			let params = { where: { show: true, type: "city", region_kladr_id } }
	
			if (!region.tariffs) params.where.tariffs = { [Op.not]: null }
	
			Areas.findAll(params)
				.then(async areas => {
					areas = areas.map(({ dataValues }) => dataValues)
					areas = await Promise.all(
						areas.map(async area => {
							return {
								...area,
								region: await Areas.findOne({ where: { kladr_id: area.regionKladrId } })
							}
						})
					)
					res.render('components/areas', { areas: areas.sort((a, b) => sort_by_field(a, b, 'shortName')) })
				})
		} else {
			res.send('')
		}
	})

router.use("/", require('./services'))

router.route("/refresh_models")
	.patch(( req, res ) => {
		refresh.run()
		res.sendStatus(200)
	})

const { checkRegion } = new RegionMiddleware()

router.use("/", require("./offers"))
router.use("/", require("./fantastic"))
router.use("/", require("./transformer"))
router.use("/", require("./game"))

router.use("/:region", checkRegion("region"), require("./_region"))

module.exports = router