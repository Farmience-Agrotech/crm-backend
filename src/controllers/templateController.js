const { Templates } = require('../models/templates.js');


exports.getTemplate = async (req, res) => {
    try {
        const templates = await Templates.find({});
        if ( !templates ) {
            return res.status(200).json({
                message: "No templates found",
            });
        }

        res.status(200).json({
            templates
        })
    } catch ( error ) {
        return res.status(200).json({
            message: error.message,
        })
    }
}


exports.createTemplate = async (req, res) => {
    try {

        const {
            name,
            description,
            templateFields
        } = req.body;

        const template = await Templates.create({
            name,
            description,
            templateFields
        });

        if ( !template ) {
            return res.status(200).json({
                message: "failed to create template",
            })
        }

        res.status(200).json({
            template
        })

    } catch ( error ) {
        res.status(200).json({
            message: error.message,
        })
    }
}
exports.deleteTemplate = async ( req, res ) => {
    try {
        const {
            templateId
        } = req.params;

        const template = await Templates.findOne({ _id : templateId});

        if ( !template ) {
            return res.status(200).json({
                message: `No template with ${templateId} found`
            })
        }

        const deleteTemplate = await Templates.deleteOne({ _id : templateId});

        res.status(200).json({
            message: `Template with ${templateId} deleted successfully`
        })
    } catch (error) {
        return res.status(200).json({
            message: error.message,
        })
    }
}
