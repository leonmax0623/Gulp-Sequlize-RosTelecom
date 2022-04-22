const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tariffHasTags', {
    tariffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
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
    tableName: 'TariffHasTags',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "TariffHasTags_pkey",
        unique: true,
        fields: [
          { name: "TariffId" },
          { name: "TagId" },
        ]
      },
    ]
  });
};
