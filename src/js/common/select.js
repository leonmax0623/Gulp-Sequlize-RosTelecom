const Choices = require('choices.js')

module.exports = () => {
	let select = document.querySelector('.selectTariff');
	if (select) {
		return new Choices(select, {
			itemSelectText:'',
			allowHTML: true,
			shouldSort: false,
			searchChoices: false,
			searchEnabled: false
		});
	}
}