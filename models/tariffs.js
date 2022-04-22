const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tariffs', {
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
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    onetimePrice: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    onetimeUnits: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "руб."
    },
    connectioPrice: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    connectionUnits: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "руб."
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    units: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "руб.\/мес."
    },
    background: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fontColor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    buttonText: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "Подключить"
    },
    buttonColor: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "#ff4f12"
    },
    buttonFontColor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    flagText: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    flagColor: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "#ff4f12"
    },
    flagTextColor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    },
    services: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    icons: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    commonIcons: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    devName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    bottomBackground: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "#f5f5f5"
    },
    bottomFontColor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    secondString: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    speedlimitXpon: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    speedlimitFttb: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    speedlimitAdsl: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'Tariffs',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Tariffs_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
