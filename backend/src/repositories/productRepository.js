const Product = require('../models/Product');


module.exports = class ProductRepository {

    static async postProdutRepository(product) {
        const newProduct = await Product.create(product);
        return newProduct;
    }

    static async getProductsRepository() {
        const products = await Product.findAll();
        return products;
    }

    static async getProductsRepositoryById(id) {
        const product = await Product.findByPk(id);
        return product;
    }

    static async getProductRepositoryByName(brand) {
        const product = await Product.findAll({ where: { brand: brand } });
        return product;
    }

    static async patchProductRepository(product, id) {
        await Product.update(product, { where: { id: id } });
        const productUpdated = await Product.findByPk(id);
        return productUpdated;
    }

    static async deleteProductRepository(id) {
        const productExists = await Product.findOne({ where: { id: id } });
        if (productExists) {
            Product.destroy({ where: { id: id } });
        } else {
            return 0;
        }
        return productExists;
    }

}


