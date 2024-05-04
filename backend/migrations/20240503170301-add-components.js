'use strict';
const Component = require('../models').component;
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up (queryInterface, Sequelize) {
    await Component.create({
      name: 'Component 1',
      uuid: uuidv4(),
    });
    await Component.create({
      name: 'Component 2',
      uuid: uuidv4(),
    });
    await Component.create({
      name: 'Component 3',
      uuid: uuidv4(),
    });

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
