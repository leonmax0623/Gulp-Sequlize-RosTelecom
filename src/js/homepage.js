const lazyloadInstance = require('./common/LazyLoad')(),
			{ livesearchActions, appendAreasListener, msnry, setDefaults } = require('./common')

/* Совершаем действия после загрузки всего документа */
document.addEventListener("DOMContentLoaded", () => {
	setDefaults();
	livesearchActions();
	appendAreasListener();
	setTimeout(() => msnry.layout(), 100)
})