const { Products } = require("../model/product-schema.js");
const { Templates } = require("../../templates/model/templates.js");

exports.createProduct = async ( req, res) => {
    try {
        const {
            name, description, sku, unit, categories, minPrice, maxPrice, taxRate, inventoryLocation, stockQuantity,
            minStockLevel, minOrderLevel, additionalFields, templateId, templateValues
        } = req.body;

        const productExists = await Products.findOne({name});
        if (productExists) {
            return res.status(400).json({message: "Product already exists."});
        }


        let finalAdditionalFields = additionalFields || [];

        if ( templateId ) {
            const template = await Templates?.findOne({ _id: templateId});

            if ( !template ) {
                return res.status(400).json({message: "Template not found"});
            }

            const fieldsFromTemplate = template.templateFields.map(
                field => {
                    return {
                        fieldName: field.fieldName,
                        fieldType: field.fieldType,
                        value: templateValues[field.fieldName] || "",
                    }
                }
            );

            finalAdditionalFields = [
                ...fieldsFromTemplate,
                ...(additionalFields || [])
            ]
        }




        const product = await Products.create({
            name, description, sku, unit, categories, minPrice, maxPrice, taxRate, inventoryLocation,
            stockQuantity, minStockLevel, minOrderLevel, additionalFields: finalAdditionalFields, templateId: templateId || null
        });

        res.status(201).json(product);
    } catch ( error ) {
        res.status(500).json({error: error.message});
    }
}