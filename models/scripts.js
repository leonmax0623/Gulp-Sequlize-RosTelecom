const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('scripts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: "NULL"
    },
    title: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      defaultValue: "NULL"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isPublished: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
      field: 'is_published'
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1
    }
  }, {
    sequelize,
    tableName: 'Scripts',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Scripts_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "scripts_order",
        fields: [
          { name: "order" },
        ]
      },
    ]
  });
};
