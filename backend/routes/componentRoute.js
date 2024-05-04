// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const componentController = require('../controller.js/componentController');

/**
 * POST /api/component/add
 * @summary Api to add data to component
 * @security BearerAuth
 *
 * @tags Component
 * 
 * @param {string} uuid.form.required - uuid of component
 * @param {string} data.form.required - data of the component
 * 
 */
router.post('/add', componentController.add);

/**
 * PUT /api/component/update
 * @summary Api to update data to component
 * @security BearerAuth
 *
 * @tags Component
 * 
 * @param {string} uuid.form.required - uuid of component
 * @param {string} data.form.required - data of the component
 * 
 */
router.put('/update', componentController.update);

/**
 * GET /api/component/
 * @summary Api to Get all components
 * @security BearerAuth
 *
 * @tags Component
 * 
 * 
 */
router.get('/', componentController.getComponents);

/**
 * GET /api/component/{uuid}
 * @summary Api to Get data of particular components
 * @security BearerAuth
 *
 * @tags Component
 * 
 * 
 */
router.get('/:uuid', componentController.getComponentById);

module.exports = router;
