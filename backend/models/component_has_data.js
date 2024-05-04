'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class component_has_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      component_has_data.belongsTo(models.component, {
        foreignKey: 'component_id',
        as: 'component' // Alias for the association
      });
    }
  }
  component_has_data.init({
    component_id: DataTypes.INTEGER,
    data: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'component_has_data',
  });
  return component_has_data;
};