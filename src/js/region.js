const lazyloadInstance = require('./common/LazyLoad')(),
			{ msnry, setDefaults } = require('./common')

/* Совершаем действия после загрузки всего документа */
document.addEventListener("DOMContentLoaded", () => {
	setDefaults();
	setTimeout(() => msnry.layout(), 100)
})