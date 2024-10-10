const Product = require('../models/Product');


module.exports = class ProductRepository {
    static async postProdutRepository(product) {
        const newUser = await Product.create(product);
        return newUser;
    }

    static async getProductsRepository() {
        const products = await Product.findAll();
        return products;
    }

    static async getProductsRepositoryById(id) {
        const product = await Product.findByPk(id);
        return product;
    }

    static async getProductRepositoryByName(name) {
        const product = await Product.findAll({ where: { name: name } });
        return product;
    }

    static async patchProductRepository(product, id) {
        await Product.update(user, { where: { id: id } });
        const productUpdated = await Product.findByPk(id);
        return productUpdated;
    }

    static async deleteProductRepository(id) {
        const productExists = await Product.findOne({ where: { id: id } });
        if (productExists) {
            Product.destroy({ where: { id: id } });
        }
    }

}


