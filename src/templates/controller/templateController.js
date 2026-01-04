const { Templates } = require('../model/templates.js');


exports.getTemplate = async (req, res) => {
    try {

        const userCompany = req.user.company;

        const templates = await Templates.find({
            $or : [
                { company: userCompany},
            ]
        }).sort({ createdAt: -1 });

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

        const userCompany = req.user.company;

        const existing = await Templates.findOne({
            name: name,
            company: userCompany
        });

        if (existing) {
            return res.status(409).json({ message: "A template with this name already exists." });
        }

        const template = await Templates.create({
            company: userCompany,
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
        const userCompany = req.user.company;

        const deletedTemplate = await Templates.findOneAndDelete({
            _id: templateId,
            company: userCompany,
        });

        if (!deletedTemplate) {
            return res.status(404).json({
                message: `Template not found or you do not have permission to delete it.`
            });
        }

        res.status(200).json({
            message: `Template successfully deleted`,
            id: templateId
        });
    } catch (error) {
        return res.status(200).json({
            message: error.message,
        })
    }
}
