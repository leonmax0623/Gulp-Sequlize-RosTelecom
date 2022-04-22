const Swiper = require("swiper/swiper-bundle.esm.browser").default

module.exports = () => {
	const target = document.querySelector('.banners-carousel')
	
	let swiper = new Swiper(target, {
		slidesPerView: 1,
		draggable: true,
		grabCursor: true,
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		}
	})

	// const banners = document.querySelectorAll('.banners .swiper-slide')
	// banners.forEach(banner => {
	// 	let bg = banner.getAttribute("data-background")
	// })
}
