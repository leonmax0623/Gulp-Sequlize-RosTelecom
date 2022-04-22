const { Areas } = require("../sequelize"),
			{ not_found } = require("../common")

module.exports = class RegionMiddleware {
	checkRegion(type) {
		return async (req, res, next) => {
			let area = await Areas.findOne({ where: { key: req.params[type], type } })
			
			if (!area || !area.show) return not_found(res)
			res.locals[type] = area
			
			next()
		}
	}
}