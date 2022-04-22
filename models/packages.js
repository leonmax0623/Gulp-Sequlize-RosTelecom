const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('packages', {
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
    tariffs: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true
    },
    devName: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    order: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true
    },
    banners: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: []
    }
  }, {
    sequelize,
    tableName: 'Packages',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Packages_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
