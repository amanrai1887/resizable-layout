'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class component extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //this.hasOne(models.component_has_data, { foreignKey: 'component_id' });
      this.hasMany(models.component_has_data, {
        foreignKey: 'component_id',
        targetKey: 'id',
        as: 'component_has_data',
    });

    }
  }
  component.init({
    uuid: DataTypes.STRING,
    name: DataTypes.STRING,
    count: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'component',
  });
  return component;
};