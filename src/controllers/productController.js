const { Products } = require("../models/products.js");
const { Templates } = require("../models/templates.js");

exports.createProduct = async ( req, res) => {
    try {
        const {
            name,
            description,
            sku,
            unit,
            categories,
            minPrice,
            maxPrice,
            taxRate,
            inventoryLocation,
            stockQuantity,
            minStockLevel,
            minOrderLevel,
            additionalFields,
            templateId,
            templateValues
        } = req.body;

        const productExists = await Products.findOne({name});
        if (productExists) {
            return res.status(400).json({message: "Product already exists."});
        }

        const template = await Templates.findOne({ _id: templateId});

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

        const finalAdditionalFields = [
            ...fieldsFromTemplate,
            ...(additionalFields || [])
        ]
        const product = await Products.create({
            name,
            description,
            sku,
            unit,
            categories,
            minPrice,
            maxPrice,
            taxRate,
            inventoryLocation,
            stockQuantity,
            minStockLevel,
            minOrderLevel,
            additionalFields: finalAdditionalFields
        });

        res.status(201).json(product);
    } catch ( error ) {
        res.status(500).json({error: error.message});
    }
}

exports.listProducts = async (req, res) => {
    try {
        const allProducts = await Products.find();
        if ( !allProducts || allProducts.length === 0){
            res.status(404).json({message: "No products found"});
        }

        res.status(200).json(allProducts);
    } catch ( error ) {
        res.status(500).json({error: error.message});
    }

}

exports.deleteProduct = async ( req, res) => {
    try {
        const {
            productId,
        } = req.params;

        const productExists = await Products.findOne({ _id: productId});
        if ( !productExists) {
            return res.status(404).json({message: "Product not found"});
        }

        const deleteProduct = await Products.deleteOne({ _id: productId });


        res.status(200).json({
            status: `successfully deleted product ${productId}`,
        })

    } catch ( error ) {
        res.status(400).json({error: error.message});
    }
}