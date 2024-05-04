// controllers/userController.js

const models = require('../models');

module.exports.add = async (req, res) => {
    try {
        const { uuid, data } = req.body;
        const component = await models.component.findOne({
            where: {
                uuid: uuid
            }
        });

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

module.exports.update = async (req, res) => {
    try {
        const { uuid, data } = req.body;
        const component = await models.component.findOne({
            where: {
                uuid: uuid
            }
        });

        const componentData = await models.component_has_data.findOne({
            where: {
                component_id: component.id
            }
        });

        componentData.data = data;
        await componentData.save();
        component.count = component.count + 1;
        await component.save();

        res.status(200).json({ componentData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.getComponents = async (req, res) => {
    try {

        const component = await models.component.findAll({
            include: [{
                model: models.component_has_data,
                as: 'component_has_data',
                // attributes: ['name'],
            }]
        });

        res.status(200).json({ component });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

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
                // attributes: ['name'],
            }]
        });

        res.status(200).json({ component });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};