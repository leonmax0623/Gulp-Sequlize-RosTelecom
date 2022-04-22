require('dotenv').config()
const { DATABASE_URL } = process.env,
			{ Sequelize, DataTypes } = require('sequelize')

/* Authenticate in Database */
const sequelize = new Sequelize(DATABASE_URL, { dialect: 'postgres', protocol: 'postgres', dialectOptions: process.env !== 'production' ? {} : { ssl: false }, logging: false })

sequelize.authenticate()
	.then(() => console.log('We are successfully connected to DB Store'))
	.catch(err => console.error(err))

/* Parse all available models */
const SequelizeAuto = require("sequelize-auto");
const options = { caseFile: 'c', caseModel: 'c', caseProp: 'c' };
const auto = new SequelizeAuto(new Sequelize(DATABASE_URL), null, null, options)

exports.refresh = auto
// auto.run()

/* Require needed models */
/* eslint-disable */
exports.Areas = require('../models/areas')(sequelize, DataTypes)
exports.Tariffs = require('../models/tariffs')(sequelize, DataTypes)
exports.TTypes = require('../models/tariffsTypes')(sequelize, DataTypes)
exports.Packages = require('../models/packages')(sequelize, DataTypes)
exports.Services = require('../models/services')(sequelize, DataTypes)
exports.ServicesTypes = require('../models/servicesTypes')(sequelize, DataTypes)
exports.Contents = require('../models/contents')(sequelize, DataTypes)
exports.Meta = require('../models/meta')(sequelize, DataTypes)
exports.Phones = require('../models/phones')(sequelize, DataTypes)
exports.Orders = require('../models/orders')(sequelize, DataTypes)
exports.Pages = require('../models/pages')(sequelize, DataTypes)
exports.Banners = require('../models/banners')(sequelize, DataTypes)
/* eslint-enable */

// module.exports = { Areas, Tariffs, TTypes, Packages, Services, ServicesTypes, Contents, Meta, Phones, refresh, sequelize }