const { submit } = require('./index')

module.exports = () => {
	const forms = document.querySelectorAll('.lead-form')
	window.setOrder = tariff => {
		forms.forEach(form => {
			const tariff_input = form.querySelector('input[name="tariff"]'),
						tariff_id_input = form.querySelector('input[name="tariffId"]'),
						price_field = form.parentNode.parentNode.parentNode.querySelector('.column.is-3 p.price span:first-of-type'),
						name_field = form.parentNode.parentNode.parentNode.querySelector('.column.is-3 p.tariff_name')

			if (tariff_input)
				tariff_input.value = `${tariff.name}${tariff.secondString ? " " + tariff.secondString : ""}`

			if (tariff_id_input)
				tariff_id_input.value = tariff.id

			if (price_field)
				price_field.innerHTML = tariff.price.value

			if (name_field)
				name_field.innerHTML = `${tariff.name}${tariff.secondString ? " " + tariff.secondString : ""}`
		})
		window.toggleModal()
	}

	window.toggleModal = () => {
		document.querySelector('.form-modal').classList.toggle('is-active')
		document.getElementsByTagName('html')[0].classList.toggle('is-clipped')
	}

	forms.forEach(form => form.addEventListener('submit', e => submit(e, form)))
}