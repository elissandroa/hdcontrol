const service = require('../services/productService');

module.exports = class ProductController {


    static async postProductController(req, res) {
        const product = {
            description: req.body.description,
            brand: req.body.brand,
            price: req.body.price
        }
        

        const newProduct = await service.postProductService(product);
        res.status(201).json(newProduct);

    }

    static async getProductController(req, res) {
        const products = await service.getProducts();
        res.status(200).json(products);
    }

    static async getProductControllerById(req, res) {
        const id = req.params.id;
        const product = await service.getProduct(parseInt(id));
        res.status(200).json(product);
    }

    static async getProductControllerByName(req, res) {
        const { brand } = req.query;
        const product = await service.getProductServiceByName(brand);
        res.status(200).json(product);
    }

    static async patchProductController(req, res) {
        const { description, brand } = req.body;
        const id = req.params.id;
        const product = {
            description,
            brand,
        }

        console.log(product)

        const updatedProduct = await service.patchProductService(product, id);
        res.status(200).json(updatedProduct);
    }

    static async deleteProductController(req, res) {
        const id = req.params.id;
        await service.deleteProductService(id);
        res.status(200).json({ message: 'Deletado com sucesso!' });
    }

}