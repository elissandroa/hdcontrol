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
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(422).json({ message: "Produto não encontrado!" })
        }

    }

    static async getProductControllerByName(req, res) {
        const { brand } = req.query;
        const product = await service.getProductServiceByName(brand);
        if (product.length > 0) {
            res.status(200).json(product);
        } else {
            res.status(422).json({ message: "Produto não encontrado !" })
        }

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
        if (updatedProduct) {
            res.status(200).json(updatedProduct);
        } else {
            res.status(422).json({ message: "Produto não encontrado!" });
        }

    }

    static async deleteProductController(req, res) {
        const id = req.params.id;
        const productDeleted = await service.deleteProductService(id);
        if(productDeleted){
            res.status(200).json({ message: 'Deletado com sucesso!' });
        } else {
            res.status(422).json({message:"Produto não encontrado!"})
        }
        
    }

}