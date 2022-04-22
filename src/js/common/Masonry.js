const Masonry = require('masonry-layout')

module.exports = () => {
	if (document.querySelector('.msnry')) {
		return new Masonry( document.querySelector('.msnry'), {
			itemSelector: '.msnry-item',
			columnWidth: '.msnry-sizer',
			percentPosition: true,
			horizontalOrder: true,
			transitionDuration: '0.2s'
		})
	}
}