const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('areas', {
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
    key: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    shortName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    fullName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    zip: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    kladrId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'kladr_id'
    },
    regionKladrId: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "",
      field: 'region_kladr_id'
    },
    districtKladrId: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "",
      field: 'district_kladr_id'
    },
    tariffs: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    secondName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    shortSecondName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    meta: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    content: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    banners: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    show: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    phones: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    groupsMeta: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    groupsPhones: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'Areas',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Areas_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
