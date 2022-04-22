const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('contents', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    mainUnderForm: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'main_under_form'
    },
    mainUnderFormEditor: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'main_under_form_editor'
    },
    default: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Contents',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Contents_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
