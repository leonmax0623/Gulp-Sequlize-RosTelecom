const { setDefaults } = require("./common"),
			lazyloadInstance = require('./common/LazyLoad')()

document.addEventListener('DOMContentLoaded', () => {
	setDefaults();
})