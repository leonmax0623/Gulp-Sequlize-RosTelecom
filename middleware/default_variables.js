require('dotenv').config()
const dayjs = require("dayjs"),
{ getPhones } = require("../common")

module.exports = async (req, res, next) => {
	res.locals.env = process.env

	res.locals.year = dayjs().format("YYYY")
	res.locals.head = {
		title: "Ростелеком",
		links: [
			{ rel: "preconnect", href: "https://fonts.gstatic.com" },
			{ rel: "icon", href: "/img/favicon.ico", type: "image/x-icon" },
			{ rel: "stylesheet", href: "https://use.fontawesome.com/releases/v5.2.0/css/all.css", type: "text/css" }
		],
		scripts: []
	}
	res.locals.header = {
		mainMenuRoutes: [
			{
					path: '/for-home',
					title: 'Для дома',
			},
			{
					path: '/for-business',
					title: 'Для бизнеса',
			},
			{
					path: '/offices',
					title: 'Офисы',
			},
			{
					path: '/help',
					title: 'Помощь',
			}
		],
		navMenuRoutes: []
	}
	res.locals.footer = {
		socials: [
			{ icon: 'tw', href: '#' },
			{ icon: 'vk', href: '#' },
			{ icon: 'fb', href: '#' },
			{ icon: 'ok', href: '#' },
			{ icon: 'yt', href: '#' },
			{ icon: 'in', href: '#' }
		]
	}

	res.locals.popular_services = [
		{
				title: 'Домашний интернет',
				background: '/img/laptop.png',
				span: 1,
				href: '/home_internet'
		},
		{
				title: 'Домашний телефон',
				background: '/img/phone.png',
				span: 1,
				href: '/home_phone'
		},
		{
				title: 'Тв + интернет',
				background: '/img/tv-internet.png',
				span: 2,
				href: '/tv_internet'
		},
		{
				title: 'Интерактивное телевидение',
				background: '/img/tv.png',
				span: 2,
				href: '/interactive_television'
		},
		{
				title: 'Умный дом',
				background: '/img/smart-house.png',
				span: 1,
				href: '/smart_house'
		},
		{
				title: 'Видеонаблюдение',
				background: '/img/camera.png',
				span: 1,
				href: '/cctv'
		}
	]

	let query = {}

	if (req.query.utm_source)
		query.utm_campaign = req.query.utm_source

	res.locals.query = query

	res.locals.renderContent = (text, params) => {
		let rendered = text

		if (params && Object.keys(params).length > 0) {
			let match = text.match(/[{]{2}(.*)[}]{2}/igm)

			if (match) {
				match.forEach(item => {
					let match = item,
							prop = item.replace(/[\{\}]/igm, "").trim()
		
					rendered = rendered.replace(match, params[prop])
				})
			}
		}

		return rendered
	}

	await getPhones(res)

	next()
}