const { Areas, Phones, ServicesTypes, Services, TTypes, Pages } = require('../sequelize'),
			{ Op, fn, col, where } = require('sequelize')

module.exports = {
	dev: process.env == "production",
	not_found: (res) => {
		
		res.locals.head.links.push({ rel: "stylesheet", href: "/css/pages/404.css", type: "text/css" })
		res.locals.head.scripts.push({ src: "/js/404.chunk.min.js" })
		
		res.status(404)
		return res.render('404')
	},
	sort_obj_alph: object => {
		return Object.keys(object).sort().reduce(
			(obj, key) => { 
				obj[key] = object[key]; 
				return obj;
			}, 
			{}
		)
	},
	sort_by_field: (a, b, fieldName) => {
		if (a[fieldName] < b[fieldName]) return -1
		if (a[fieldName] > b[fieldName]) return 1
		return 0
	},
	$query: params => params && Object.keys(params).length > 0 ? "?" + Object.keys(params).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`).join("&") : "",
	searchQuery: (Op, keyword, field = 'name') => {
		return {
			[Op.or]: [
				{ [field]: { [Op.substring]: keyword } },
				{ [field]: { [Op.substring]: keyword.toUpperCase() } },
				{ [field]: { [Op.substring]: `${keyword.charAt(0).toUpperCase()}${keyword.slice(1)}` } },  
				{ [field]: { [Op.startsWith]: `${keyword.charAt(0).toUpperCase()}${keyword.slice(1)}` } },
				{ [field]: { [Op.startsWith]: `${keyword.toUpperCase()}` } },
				{ [field]: { [Op.endsWith]: keyword } }
			]
		}
	},
	getPhones: (res, area) => {
		return new Promise(async (resolve, reject) => {
			if (!area) {
				res.locals.phones = await Phones.findOne({ where: { backup_active: true }, raw: true })
					.then(async phones => phones || await Phones.findOne({ where: { default: true }, raw: true }))
					.catch(err => reject(err))
				resolve(true)
			} else {
				res.locals.phones = await Areas.findOne({ where: { key: area }, raw: true })
					.then(async area => {
						if (area.phones) {
							res.locals.phones = await Phones.findOne({ where: { backup_active: true }, raw: true })
								.then(async phones => phones || await Phones.findOne({ where: { id: area.phones }, raw: true }))
								resolve(true)
						} else {
							res.locals.phones = await Phones.findOne({ where: { backup_active: true }, raw: true })
								.then(async phones => phones || await Phones.findOne({ where: { default: true }, raw: true }))
								resolve(true)
						}
					})
			}
		})
	},
	getPages: package => {
		return new Promise(( resolve, reject ) => {
			let params = {
				where: {
					[Op.and]: where(
						fn('JSONB_ARRAY_LENGTH', col('tariffs')),
						{ [Op.gt]: 0 },
					),
					package
				}
			}
	
			return Pages.findAll(params)
				.then(resolve)
				.catch(reject)
		})
	},
	tariffBuilder: (tariffs, tabs = true) => {
		return new Promise((resolve, reject) => {
			return TTypes.findAll({ where: { id: { [Op.or]: tariffs.map(({ type }) => type) } } })
				.then(t_types => {
					let services_ids = []
					for (let { services } of tariffs) {
						if (services) {
							for (let { id } of services) {
								services_ids.push(id)
							}
						}
					}
					Services.findAll({ where: { id: { [Op.or]: services_ids } }, raw: true })
						.then(services => {
							return ServicesTypes.findAll({ where: { id: { [Op.or]: services.map(({ type }) => type) } } })
								.then(s_types => {
									let result_tariffs = tabs ? {} : [],
											stock = []

									for (let i in tariffs) {
										let tariff = tariffs[i]

										let t_type = t_types.filter(({ id }) => id == tariff.type)[0],
												t_type_name = t_type.name

										if (!result_tariffs[t_type_name] && tabs) result_tariffs[t_type_name] = []

										let main_services = []
										let common_services = []
										
										/** Собираем основные услуги тарифа */
										for (let i in t_type.servicesTypes) {
											let s_type = t_type.servicesTypes[i]

											let db_s_type = s_types.filter(({ id }) => id == s_type.id)[0]

											let result_services = services.filter(({ type, id }) => type == s_type.id && tariff.services && tariff.services.find(service => service.id == id))
											let subtitles_arr = []

											for (let i in result_services) {
												let result_service = result_services[i],
														tariff_service = tariff.services.filter(({ id }) => id == result_service.id)[0]

												if (tariff_service && tariff_service.changes) {
													for (let prop in tariff_service.changes) {
														result_service[prop] = tariff_service.changes[prop]
													}
												}

												subtitles_arr.push(`${result_service.value}${s_type.hasConnectionType ? " " + result_service.valueUnits : ""}`)
											}

											main_services.push({
												icon: db_s_type.icon,
												isDark: tariff.icons[s_type.id].isDark,
												background: tariff.icons[s_type.id].background,
												title: tariff.icons[s_type.id].typeName,
												subtitle: subtitles_arr.join(", ")
											})
										}

										for (let key in tariff.commonIcons) {
											let common_icon = tariff.commonIcons[key],
													s_type = s_types.filter(({ id }) => id == key)[0],
													db_s_type = s_types.filter(({ id }) => id == s_type.id)[0]

											if (s_type) {
												let db_services = services.filter(({ type, id }) => s_type.id == type && tariff.services && tariff.services.find(service => service.id == id))

												let subtitles_arr = []

												for (let i in tariff.services) {
													let service = tariff.services[i]

													let result = db_services.filter(({ id }) => service.id == id)

													if (service && service.changes) {
														for (let prop in service.changes) {
															if (result[0]) result[0][prop] = service.changes[prop]
														}
													}

													if (result && result.length > 0) subtitles_arr.push(result[0])
												}

												subtitles_arr = subtitles_arr.map(({ name, value, valueUnits }) => `${name}${value ? " " + value : " "}${s_type.hasConnectionType || valueUnits ? " " + valueUnits : ""}`)

												common_services.push({
													icon: db_s_type.icon,
													isDark: common_icon.isDark,
													background: common_icon.background,
													title: common_icon.typeName,
													subtitle: subtitles_arr
												})
											}
										}

										let result_tariff = {
											id: tariff.id,
											name: tariff.name,
											secondString: tariff.secondString,
											services: {
												main: main_services,
												common: common_services
											},
											flag: {
												content: tariff.flagText,
												background: tariff.flagColor,
												text: tariff.flagTextColor == 0 ? "#363636" : "#FFFFFF"
											},
											button: {
												content: tariff.buttonText,
												text: tariff.buttonFontColor == 0 ? "#363636" : "#FFFFFF",
												background: tariff.buttonColor
											},
											price: {
												value: tariff.price,
												units: tariff.units.split("/")
											},
											background: tariff.background,
											bottomBackground: tariff.bottomBackground,
											fontColor: tariff.fontColor == 0 ? "#363636" : "#fff",
											bottomFontColor: tariff.bottomFontColor == 0 ? "#363636" : "#fff"
										}

										/* Собираем итоговый вид тарифа */
										if (tabs)
											result_tariffs[t_type_name].push(result_tariff)
										else
											result_tariffs.push(result_tariff)
											
										if (tariff.isStock) stock.push(result_tariff)
									}

									if (stock.length > 0 && tabs)
										result_tariffs = Object.assign({ "Акции": stock }, result_tariffs)
									
									resolve(result_tariffs)
								})
						})
				})
		})
	}
}