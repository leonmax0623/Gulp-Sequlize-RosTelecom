const { Router } = require("express"),
			{ Areas, Packages, Tariffs, Banners } = require('../../../../sequelize'),
			{ not_found, getPages, tariffBuilder } = require("../../../../common"),
			{ Op } = require('sequelize')

const router = new Router({ mergeParams: true })

router.route('/')
	.get(( req, res ) => {
		const { city: area, page: path } = req.params,
					{ only_tariff } = req.query

		res.locals.area_path = area
		res.locals.area = area
		res.locals.path = path
		
		Areas.findOne({ where: { key: area } })
			.then(async area => {
				if (!area) return not_found(res)
				res.locals.area = area

				let tariffs = area.tariffs
				if (!tariffs) {
					let region = await Areas.findOne({ where: { kladr_id: area.regionKladrId }, raw: true })
					tariffs = region.tariffs
				}

				Packages.findByPk(tariffs)
					.then(async package => {
						if (!package) return not_found(res)
						
						let pages = await getPages(package.id)
						res.locals.header.navMenuRoutes = pages

						let page = pages.find(p => p.path == `/${path}`)
						if (!page) return not_found(res)
						
						res.locals.page = page
						
						// Собираем тарифы
						let package_tariffs = package.tariffs.filter(tariff => page.tariffs.find(id => id == tariff.id))
						let db_tariffs = await Tariffs.findAll({ where: { id: { [Op.or]: page.tariffs } } })

						let tariffs = db_tariffs.map(tariff => {
							let package_tariff = package_tariffs.find(item => item.id == tariff.id)
							Object.keys(package_tariff).forEach(prop => tariff[prop] = package_tariff[prop])
							return tariff
						})
						
						res.locals.tariffs = await tariffBuilder(tariffs)
						
						// Проверяем наличие указанной табы
						let hasTab = !req.query.tab || (req.query.tab && Object.keys(res.locals.tariffs).find(name => name == req.query.tab.replace(/%2B/g, '+')))

						// Если нет указанной табы, редиректим на страницу без табы
						if (!hasTab) return res.redirect(`/${res.locals.region.key}/${area.key}/${req.params.page}`)

						if (package.order && package.order.length > 0) {
							let t = res.locals.tariffs
							res.locals.tariffs = {}

							package.order.forEach(({ name }) => {
								res.locals.tariffs[name] = t[name]
							})
						}

						// Добавлем список табов в рендер шаблона
						res.locals.tabs = Object.keys(res.locals.tariffs).map(name => { return { name, width: (name.length * 10) + 56 } })
						
						// Отдаём данные о текущей табе в рендер шаблона
						res.locals.tab = req.query.tab ? req.query.tab.replace(/%2B/g, '+') : Object.keys(res.locals.tariffs)[0]
						
						// Добавляем пути к пользовательским скриптам и стилям
						res.locals.head.scripts.push({ src: "/js/page.chunk.min.js" })
						res.locals.head.links.push(
							{ rel: "stylesheet", href: "/css/swiper.min.css", type: "text/css" },
							{ rel: "stylesheet", href: "/css/pages/page.css", type: "text/css" }
						)

						if (!only_tariff && page.banners.length > 0)
							res.locals.banners = await Banners.findAll({ where: { id: { [Op.or]: page.banners } } })

						if (only_tariff)
							res.locals.items = res.locals.tariffs[req.query.tab]

						res.locals.mainHref = `/${res.locals.region.key}/${area.key}`

						res.render(only_tariff ? "components/tabs/panels" : "page")
					})
			})
	})

module.exports = router