var DataTypes = require("sequelize").DataTypes;
var _actions = require("./actions");
var _addressbooks = require("./addressbooks");
var _areas = require("./areas");
var _areasGroups = require("./areasGroups");
var _banners = require("./banners");
var _channelGroups = require("./channelGroups");
var _channels = require("./channels");
var _contents = require("./contents");
var _faqs = require("./faqs");
var _meta = require("./meta");
var _orders = require("./orders");
var _packages = require("./packages");
var _pages = require("./pages");
var _phones = require("./phones");
var _scripts = require("./scripts");
var _services = require("./services");
var _servicesTypes = require("./servicesTypes");
var _tags = require("./tags");
var _tariffTags = require("./tariffTags");
var _tariffs = require("./tariffs");
var _tariffsTypes = require("./tariffsTypes");
var _users = require("./users");

function initModels(sequelize) {
  var actions = _actions(sequelize, DataTypes);
  var addressbooks = _addressbooks(sequelize, DataTypes);
  var areas = _areas(sequelize, DataTypes);
  var areasGroups = _areasGroups(sequelize, DataTypes);
  var banners = _banners(sequelize, DataTypes);
  var channelGroups = _channelGroups(sequelize, DataTypes);
  var channels = _channels(sequelize, DataTypes);
  var contents = _contents(sequelize, DataTypes);
  var faqs = _faqs(sequelize, DataTypes);
  var meta = _meta(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var packages = _packages(sequelize, DataTypes);
  var pages = _pages(sequelize, DataTypes);
  var phones = _phones(sequelize, DataTypes);
  var scripts = _scripts(sequelize, DataTypes);
  var services = _services(sequelize, DataTypes);
  var servicesTypes = _servicesTypes(sequelize, DataTypes);
  var tags = _tags(sequelize, DataTypes);
  var tariffTags = _tariffTags(sequelize, DataTypes);
  var tariffs = _tariffs(sequelize, DataTypes);
  var tariffsTypes = _tariffsTypes(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  tags.belongsToMany(tariffs, { as: 'tariffIdTariffs', through: tariffTags, foreignKey: "tagId", otherKey: "tariffId" });
  tariffs.belongsToMany(tags, { as: 'tagIdTags', through: tariffTags, foreignKey: "tariffId", otherKey: "tagId" });
  tariffTags.belongsTo(tags, { as: "tag", foreignKey: "tagId"});
  tags.hasMany(tariffTags, { as: "tariffTags", foreignKey: "tagId"});
  tariffTags.belongsTo(tariffs, { as: "tariff", foreignKey: "tariffId"});
  tariffs.hasMany(tariffTags, { as: "tariffTags", foreignKey: "tariffId"});

  return {
    actions,
    addressbooks,
    areas,
    areasGroups,
    banners,
    channelGroups,
    channels,
    contents,
    faqs,
    meta,
    orders,
    packages,
    pages,
    phones,
    scripts,
    services,
    servicesTypes,
    tags,
    tariffTags,
    tariffs,
    tariffsTypes,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
