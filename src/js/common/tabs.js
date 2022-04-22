const Swiper = require("swiper/swiper-bundle.esm.browser").default,
			{ setGetParam, parseHTML } = require("./index"),
			regeneratorRuntime = require('regenerator-runtime'),
			axios = require('axios')

module.exports = (PATH, lazyloadInstance) => {

	const setCellsHeight = () => {
		const tabs = document.querySelectorAll('.panels .panel'),
					wrapper = document.querySelector('.panels .swiper-wrapper')
		
		wrapper.style.height = "unset"

		let max_height = 0
		for (let tab of tabs) {
			let height = parseFloat(tab.offsetHeight)
			if (height > max_height) max_height = height
		}

		wrapper.style.height = `${max_height}px`
	}

	// Слайдер табуляции
	let initialSlide = 0
	const tabName = new URLSearchParams(window.location.search).get('tab'),
				tabs = document.querySelectorAll('.tabs .tab')
	for (let i in tabs) {
		let tab = tabs[i]
		if (typeof tab == 'object' && tab.getAttribute('name') == tabName) initialSlide = i
	}
	const tabSlider = new Swiper('.tabs .main-carousel', {
		slidesPerView: 'auto',
		draggable: true,
		grabCursor: true,
		initialSlide
	})
	window.setTabSlide = dir => tabSlider[`slide${dir}`]()

	// Слайдер тарифов
	const panelSlider = new Swiper('.panels .main-carousel', {
		slidesPerView: 4,
		draggable: true,
		grabCursor: true
	})
	window.setPanelSlide = dir => panelSlider[`slide${dir}`]()
	setCellsHeight();

	/* Переключаем табы */
	function setTab(name, i) {
		setGetParam('tab', name)

		const loader = document.querySelector('.tab-loader')
		loader.setAttribute('data-load', 'loading')

		axios.get(eval(PATH))
			.then(async ({ data }) => {
				let tabs = document.querySelectorAll('.tabs .tab')

				for (let y in tabs) {
					let tab = tabs[y]
					if (tab.classList) tab.classList.remove("bg-custom-red-2", "bg-custom-brand-2", "rounded-full", "text-white")
				}
				tabs[i].classList.add(name == "Акции" ? "bg-custom-brand-2" : "bg-custom-red-2", "rounded-full", "text-white")
				
				const html = await parseHTML(data)

				const panels = document.querySelector('.panels .main-carousel')

				panelSlider.disable()

				panels.querySelector('.swiper-wrapper').innerHTML = ""
				panels.querySelector('.swiper-wrapper').appendChild(html)

				panelSlider.enable()

				setCellsHeight()

				loader.setAttribute('data-load', 'loaded')
				lazyloadInstance.update()
			})
	}

	window.setTab = setTab
}