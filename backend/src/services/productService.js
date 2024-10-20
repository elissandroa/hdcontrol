const repository = require('../repositories/productRepository');

module.exports = class ProductService {

    static async postProductService(product) {
        let msg = '';
        try {
            const descriptionEmpty = product.description.length;
            const brandEmpty = product.brand.length;


            if (!descriptionEmpty) {
                msg = { message: 'O campo description é obrigatório' };
                return msg;
            }

            if (!brandEmpty) {
                msg = { message: 'O campo marca é obritatório' };
                return msg;
            }
            const newProduct = await repository.postProdutRepository(product);

            return newProduct;

        } catch (error) {
            console.log(error);
            msg = 'Serviço não disponível no momento, tente novamente mais tarde!';
            return msg;
        }
    }

    static async getProducts() {
        let msg = '';
        try {
            const products = await repository.getProductsRepository();
            if (products.length === 0) {
                msg = 'Não há produtos cadastrados!';
                return msg;
            }
            return products;
        } catch (error) {
            console.log(error);
            msg = 'Serviço não disponível no momento, tente novamente mais tarde!';
            return msg;
        }

    }

    static async getProduct(id) {
        let msg = '';

        const product = await repository.getProductsRepositoryById(id);
        if (product === null) {
            return 0;
        }
        return product;

        msg = 'Serviço não disponível no momento, tente novamente mais tarde!';



    }

    static async getProductServiceByName(brand) {
        let msg = '';
        try {
            const products = await repository.getProductRepositoryByName(brand);
            return products;
        } catch (error) {
            console.log(error);
            msg = 'Serviço não disponível no momento, tente novamente mais tarde!';
            return msg;
        }
    }

    static async patchProductService(product, id) {
        let msg = '';
        try {
            const updatedProduct = await repository.patchProductRepository(product, id);
            return updatedProduct;
        } catch (error) {
            console.log(error);
            msg = 'Serviço não disponível no momento, tente novamente mais tarde!';
            return msg;
        }
    }

    static async deleteProductService(id) {
        const productExists = repository.deleteProductRepository(id);
        return productExists;
    }
}