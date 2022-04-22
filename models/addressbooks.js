const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('addressbooks', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cityType: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    district: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    street: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    streetType: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    houseNumber: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    technology: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    regionKladr: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Addressbooks',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Addressbooks_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
