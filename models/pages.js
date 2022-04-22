const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pages', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    banners: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: []
    },
    tariffs: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: []
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    package: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Pages',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "Pages_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
