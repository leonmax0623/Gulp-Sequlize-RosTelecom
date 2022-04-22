const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('servicesTypes', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    icon: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    hasConnectionType: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    hasChannels: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    hasCctv: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'hasCCTV'
    },
    hasMobile: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'ServicesTypes',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "ServicesTypes_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
