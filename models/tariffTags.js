const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tariffTags', {
    tariffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Tariffs',
        key: 'id'
      },
      field: 'TariffId'
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Tags',
        key: 'id'
      },
      field: 'TagId'
    }
  }, {
    sequelize,
    tableName: 'TariffTags',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "TariffTags_pkey",
        unique: true,
        fields: [
          { name: "TariffId" },
          { name: "TagId" },
        ]
      },
    ]
  });
};
