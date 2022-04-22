const lazyloadInstance = require('./common/LazyLoad')(),
			{ setDefaults, livesearchActions, appendAreasListener, toggleAreaSelector, closeAreaSelectorListener } = require('./common'),
			regeneratorRuntime = require('regenerator-runtime'),
			tabs = require('./common/tabs'),
			forms = require('./common/forms'),
			banners = require('./common/bannersSlider')

document.addEventListener('DOMContentLoaded', () => {
	setDefaults();
	tabs("`/${region.key}/${area.key}?tab=${name}&only_tariff=true`", lazyloadInstance);
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