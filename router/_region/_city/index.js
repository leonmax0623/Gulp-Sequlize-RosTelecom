const { Router } = require('express'),
			{ Op } = require('sequelize'),
			{ Areas, Tariffs, Packages, Contents, Meta, Orders, Banners } = require("../../../sequelize"),
			{ not_found, getPhones, tariffBuilder, getPages } = require('../../../common')

const router = new Router({ mergeParams: true })

router.route('/')
	.get(async ( req, res ) => {
		res.locals.area_path = req.params.city
		
		Areas.findOne({ where: { key: req.params.city, region_kladr_id: res.locals.region.kladrId } })
			.then(async area => {
				if (!area || !area.show) return not_found(res)

				if (area.content) {
					area.content = await Contents.findByPk(area.content).then(({ mainUnderForm }) => mainUnderForm)
				} else {
					area.content = await Contents.findOne({ where: { default: true } }).then(content => content ? content.mainUnderForm : null)
				}

				let meta;
				if (area.meta)
					meta = await Meta.findByPk(area.meta)
				else
					meta = await Meta.findOne({ where: { default: true } })

				if (meta) {
					res.locals.head.title = meta.title
					res.locals.head.description = meta.description
					res.locals.head.keywords = meta.keywords
				}

				res.locals.head.scripts.push({ src: "/js/area.chunk.min.js" })

				res.locals.head.links.push(
					{ rel: "stylesheet", href: "/css/swiper.min.css", type: "text/css" },
					{ rel: "stylesheet", href: "/css/pages/area.css", type: "text/css" }
				)

				let tariffs = area.tariffs
				if (!tariffs) {
					let region = await Areas.findOne({ where: { kladr_id: area.regionKladrId }, raw: true })
					tariffs = region.tariffs
				}

				Packages.findByPk(tariffs)
					.then(async package => {
						if (!package) return not_found(res)

						res.locals.header.navMenuRoutes = await getPages(package.id)

						Tariffs.findAll({ where: { id: { [Op.or]: package.tariffs.map(({id}) => id) } } })
							.then(async tariffs => {
								let result_tariffs = await tariffBuilder(tariffs)

								if (package.order && package.order.length > 0) {
									let t = result_tariffs

									result_tariffs = {}

									for (let item of package.order) {
										result_tariffs[item.name] = t[item.name]
									}
								}

								let hasSame = () => {
									let exist = Object.keys(result_tariffs).filter(name => name == req.query.tab.replace(/%2B/g, '+')).length > 0

									return exist || (req.query.tab == "Акции" && stock.length > 0)
								}

								if (!req.query.tab || !hasSame())
									return res.redirect(`/${req.params.region}/${req.params.city}?tab=${Object.keys(result_tariffs)[0].replace(/[+]/g, '%2B')}`)

								await getPhones(res, area.key)
								
								for (let prop in result_tariffs) {
									result_tariffs[prop] = result_tariffs[prop].sort(( a, b ) => a.price.value - b.price.value)
								}

								if (!req.query.only_tariff && package.banners && package.banners.length > 0)
									res.locals.banners = await Banners.findAll({ where: { id: { [Op.or]: package.banners } } })


								if (!req.query.only_tariff)
									return res.render('area', {
										area,
										tariffs: result_tariffs, 
										tabs: Object.keys(result_tariffs).map(name => { return { name, width: (name.length * 10) + 56 } }),
										tab: req.query.tab.replace(/%2B/g, '+'),
										tabIndex: Object.keys(result_tariffs).indexOf(req.query.tab.replace(/%2B/g, '+'))
									})
								else
									return res.render('components/tabs/panels', { items: result_tariffs[req.query.tab] })
							})
					})
			})
	})

router.route('/create_order')
	.post(( req, res ) => {
		const { order } = req.body,
					{ area } = req.params

		Areas.findOne({ where: { key: area } })
			.then(area => {
				if (!area) return res.sendStatus("404")

				Orders.create(order)
					.then(() => res.sendStatus(200))
			})
	})

router.use("/:page", require('./_page'))

module.exports = router