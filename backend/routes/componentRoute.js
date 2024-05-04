// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const componentController = require('../controller.js/componentController');

// Signup route
router.post('/add', componentController.add);

// Login route
router.put('/update', componentController.update);

router.get('/', componentController.getComponents);

router.get('/:uuid', componentController.getComponentById);

module.exports = router;
