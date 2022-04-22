const { setDefaults, livesearchActions, appendAreasListener, toggleAreaSelector, closeAreaSelectorListener } = require("./common"),
			lazyloadInstance = require('./common/LazyLoad')(),
			regeneratorRuntime = require('regenerator-runtime'),
			tabs = require('./common/tabs'),
			forms = require('./common/forms'),
			banners = require('./common/bannersSlider')

document.addEventListener("DOMContentLoaded", () => {
	setDefaults();

	tabs("`/${REGION}/${AREA}/${path}?tab=${name}&only_tariff=true`", lazyloadInstance);
	forms();
	banners();

	document.querySelector('header .city').addEventListener('click', () => {
		toggleAreaSelector()
			.then(() => {
				livesearchActions();
				closeAreaSelectorListener();
				appendAreasListener();
			})
	})
})