const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('services', {
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
    value: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    description: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    units: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    common: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    connectionType: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    channels: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    although: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true
    },
    valueUnits: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Services',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Services_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
