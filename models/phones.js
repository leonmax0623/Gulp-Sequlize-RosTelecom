const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('phones', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    forNew: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'for_new'
    },
    techSupport: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'tech_support'
    },
    backup: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    backupActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'backup_active'
    },
    default: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Phones',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Phones_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
