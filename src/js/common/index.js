const axios = require('axios'),
			regeneratorRuntime = require('regenerator-runtime'),
			Masonry = require('./Masonry'),
			msnry = Masonry()

// Парсер html
exports.parseHTML = (html) => {
	return new Promise((resolve, reject) => {
		try {
			let t = document.createElement('template')
			t.innerHTML = html
			resolve(t.content)
			t.remove()
		} catch(err) {
			reject(err)
		}
	})
}

// Masonry
exports.msnry = msnry

// Дебаунсер для livesarch
exports.debounce = (func, wait = 100) => {
	let timeout;
	return function(...args) {
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			func.apply(this, args)
		}, wait)
	}
}

// Скрываем загрузку страницы
exports.hideLoading = () => {
	const target = document.querySelector('.loading')
	setTimeout(() => target.style.opacity = 0, 300)
	setTimeout(() => target.remove(), 1300)
}

exports.hidePopups = () => {
	/* Закрываем всякие всплывашки при клике мимо */
	document.addEventListener("click", e => {
		const support_triggers = document.querySelectorAll(".support_trigger")

		for (let trigger of support_triggers) {
			if (!e.target.classList.contains("support_trigger") && !e.target.classList.contains("support-box") && trigger.classList.contains('active'))
				trigger.classList.remove('active') 
		}

		const dropdown_trigger = document.querySelector('.dropdown_trigger')

		if (!e.target.classList.contains("dropdown_trigger") && !e.target.classList.contains("dropdown_content") && dropdown_trigger.classList.contains("active"))
			dropdown_trigger.classList.remove('active')
	})
}

exports.setGetParam = (key, value) => {
	if (history.pushState) {
		var params = new URLSearchParams(window.location.search);
		params.set(key, value);
		var newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params.toString();
		window.history.pushState({path:newUrl},'',newUrl);
	}
}

// Закрываем выбиралку города
exports.closeAreaSelector = () => {
	const area_selector = document.querySelector('.area-selector')
	
	area_selector.classList.remove('on-top')
	setTimeout(() => {
		const body = document.querySelector('body')

		body.classList.remove('overflow-hidden')
		area_selector.remove()
		
		document.querySelector("link[href='/css/pages/homepage.css']").remove()
	}, 400)
}
exports.closeAreaSelectorListener = () => {
	document.querySelector('.area-selector .cross').addEventListener('click', () => this.closeAreaSelector())
}

// Открываем выбиралку города
exports.toggleAreaSelector = () => {
	return new Promise((resolve, reject) => {
		return axios.get('/?only_body=true')
			.then(async ({ data }) => {
				const head = document.querySelector('head')
				const body = document.querySelector('body')

				body.classList.add('overflow-hidden')

				let area_selector = await this.parseHTML(data)
				body.appendChild(area_selector)

				let style = document.createElement('link')
				style.setAttribute('rel', 'stylesheet')
				style.setAttribute('href', '/css/pages/homepage.css')
				style.setAttribute('type', 'text/css')
				head.appendChild(style)

				setTimeout(() => {
					document.querySelector('.area-selector').classList.add('on-top')
					Masonry()
				}, 100)

				resolve(true)
			})
			.catch(reject) 
	})
}

// Открываем/закрываем меню
exports.toggleMenu = () => {
	window.toggleMenu = () => {
		const burger = document.getElementById('burger')
		burger.classList.toggle('active')
		
		const menu = document.getElementById('mobile-menu')
	
		if (menu.classList.contains('active')) {
			setTimeout(() => {
				menu.classList.toggle('flex')
				menu.classList.toggle('hidden')
			}, 300)
	
			menu.classList.toggle('active')
		} else {
			menu.classList.toggle('flex')
			menu.classList.toggle('hidden')
	
			setTimeout(() => menu.classList.toggle('active'))
		}
		
		
		const body = document.getElementsByTagName('body')[0]
		body.classList.toggle('overflow-hidden')
	}
}

// Открываем/Закрываем данные по тп
exports.toggleSupport = () => {
	window.toggleSupport = ({ target }) => {
		target.classList.toggle('active')
	}
}

// Открываем/Закрываем дропдаун в шапке
exports.toggleDropdown = () => {
	window.toggleDropdown = ({ target }) => {
		target.classList.toggle('active')
	}
}

/* Вытаскиваем города из БД */
exports.appendAreas = (kladr_id, i) => {
	const target = document.querySelector(`.region-${i}`)

	if (target.classList.contains('appendless')) return

	if (target.classList.contains('active')) {
		const list = target.querySelector('.areas-list')
		list.style.height = '0px'
		target.classList.remove('active')
		let interval = setInterval(() => Masonry(), 10)
		setTimeout(() => clearInterval(interval), 320)
		return setTimeout(() => {
			target.querySelector('.areas-list').remove()
		}, 300)
	}

	axios.post(`/?region_kladr_id=${kladr_id}`)
		.then(async ({ data }) => {
			const ul = await this.parseHTML(data)

			target.classList.add('active')
			target.appendChild(ul)

			const list = target.querySelector('.areas-list')
			const height = list.offsetHeight

			list.style.height = '0px'
			list.style.overflow = 'hidden'
			list.style.transition = 'height .3s ease-in-out'

			setTimeout(() => list.style.height = `${height}px`, 10)
			let interval = setInterval(() => Masonry(), 10)
			setTimeout(() => clearInterval(interval), 320)
		})
}

exports.appendAreasListener = () => {
	document.querySelector('.msnry').addEventListener("click", e => {
		if (e.target.matches('.region')) this.appendAreas( e.target.getAttribute('kladr_id'), e.target.getAttribute('i') )
	})
}

// Осуществляем лайфсёрч
exports.search = e => {
	const { value } = e.target
	if (value && value.length > 0) {
		axios.post(`/?keyword=${value}`)
			.then(async ({ data }) => {
				const results = document.getElementById("live_result")
				if (results) results.remove()

				if (data.length > 0) {
					const box = await this.parseHTML(data)

					const target = document.querySelector('.livesearch .control')
					target.appendChild(box)
				}
			})
	} else {
		const results = document.getElementById("live_result")
		if (results) results.remove()
	}
}

// Закрывашка Livesearch
exports.livesearchActions = () => {
	const livesearch = document.getElementById("livesearch")

	livesearch.addEventListener('input', this.debounce(e => {
		return this.search(e)
	}, 500))

	document.getElementById('live_form').addEventListener('submit', e => e.preventDefault())

	// Удаляем окно лайфсёрч при клике в другое место
	document.addEventListener("click", e => {
		const { target } = e
		const results = document.getElementById('live_result')
		if (!target.matches('#live_result') && !target.matches('#livesearch') && results)
			results.remove()
	})
}

// Отправка формы
let pending = false
exports.submit = (e, form) => {
	e.preventDefault()
	const inputs = form.querySelectorAll('input')

	const order = {}

	let hasEmpty = false
	for (let input of inputs) {
		const name = input.getAttribute('name'),
					disabled = input.getAttribute('disabled'),
					{ value } = input

		if (!disabled && name) {
			if (name == "phone" && !/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm.test(value)) {
				hasEmpty = true
				return input.classList.add("empty", "invalid")
			} else {
				input.classList.remove("empty", "invalid")
			}

 			if (!value.trim()) {
				hasEmpty = true
				input.classList.add('empty')
				if (name == "tariff_id")
					input.classList.add('empty')
			} else {
				order[name] = value
				input.classList.remove('empty')
				if (name == "tariff_id")
					input.classList.remove('empty')
			}
		}
	}

	if (hasEmpty) return

	const btn = form.querySelector('button')
	btn.classList.add('is-loading')

	order.query = QUERY

	axios.post(`/${area}/create_order`, { order })
		.then(() => {
			btn.classList.remove('is-loading')

			form.innerHTML = `
				<div class='thanks'>
					<img src="/img/check.svg">
					<h3>Ваша заявка успешно принята.</h3>
					<p>Ожидайте звонка от специалиста. С вами свяжутся в ближайшее время</p>
					<div class="hidden rounded-xl bg-custom-red-2 col-span-4 text-white text-sm h-12 sm:block lg:col-span-3 xl:col-span-4" onclick='toggleModal()'>Назад на сайт</div>
				</div>
			`
		})
		.catch(() => btn.classList.remove('is-loading'))
}

// Устанавливаем дефолтные функции
exports.setDefaults = () => {
	this.hidePopups()
	this.hideLoading()
	this.toggleSupport()
	this.toggleDropdown()
	this.toggleMenu()
}

// exports.$query = params => {
// 	let esc = encodeURIComponent
// 		return params ? Object.keys(params)
// 			.map(k => esc(k) + '=' + esc(params[k]))
// 			.join('&') : ""
// }

let esc = encodeURIComponent
exports.$query = params => params ? "?" + Object.keys(params).map(k => `${esk(k)}=${esc(params[k])}`).join("&") : ""