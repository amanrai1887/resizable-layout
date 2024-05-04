// controllers/userController.js

// Import models
const models = require('../models');

/**
 * Add data to a component.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - JSON object containing the added component data.
 */
module.exports.add = async (req, res) => {
    try {
        const { uuid, data } = req.body;

        if (!uuid) {
            return res.status(412).json({ message: 'Please send valid id of component' });
        }
        if (!data) {
            return res.status(412).json({ message: 'Please send valid data' });
        }
        const component = await models.component.findOne({
            where: {
                uuid: uuid
            }
        });

        if (!component) {
            return res.status(412).json({ message: 'Please send valid component' });
        }

        const componentData = await models.component_has_data.findOne({
            where: {
                component_id: component.id
            }
        });

        if (componentData) {
            await models.component_has_data.destroy({
                where: {
                    component_id: component.id
                },
                force: true
            });
        }

        const component_data = await models.component_has_data.create({ component_id: component.id, data: data });
        component.count = component.count + 1;
        await component.save();

        res.status(200).json({ component_data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Update data of a component.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - JSON object containing the updated component data.
 */
module.exports.update = async (req, res) => {
    try {
        const { uuid, data } = req.body;

        if (!uuid) {
            return res.status(412).json({ message: 'Please send valid id of component' });
        }
        if (!data) {
            return res.status(412).json({ message: 'Please send valid data' });
        }
        const component = await models.component.findOne({
            where: {
                uuid: uuid
            }
        });

        if (!component) {
            return res.status(412).json({ message: 'Please send valid component' });
        }

        const componentData = await models.component_has_data.findOne({
            where: {
                component_id: component.id
            }
        });

        if (componentData.data !== data) {

            componentData.data = data;
            await componentData.save();
        }
        component.count = component.count + 1;
        await component.save();

        res.status(200).json({ componentData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Get all components with their associated data.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - JSON object containing all components with their associated data.
 */
module.exports.getComponents = async (req, res) => {
    try {
        const component = await models.component.findAll({
            include: [{
                model: models.component_has_data,
                as: 'component_has_data',
            }]
        });

        res.status(200).json({ component });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Get a component by its UUID with its associated data.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - JSON object containing the component with its associated data.
 */
module.exports.getComponentById = async (req, res) => {
    try {
        const { uuid } = req.params;
        const component = await models.component.findOne({
            where: {
                uuid: uuid
            },
            include: [{
                model: models.component_has_data,
                as: 'component_has_data',
            }]
        });

        res.status(200).json({ component });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
