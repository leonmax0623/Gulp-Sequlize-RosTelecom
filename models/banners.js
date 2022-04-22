const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('banners', {
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
    src: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    buttonColor: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    buttonBackground: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    buttonText: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Banners',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Banners_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
