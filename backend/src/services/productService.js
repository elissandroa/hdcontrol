const repository = require('../repositories/productRepository');
const getToken = require('../helpers/get-token');


module.exports = class ProductService {

    static async postProductService(product) {
        let msg = '';
        try {
            const descriptionEmpty = product.description.length;
            const brandEmpty = product.brand.length;
            const priceEmpty = product.price.length;


            if (!descriptionEmpty) {
                msg = { message: 'O campo description é obrigatório' };
                return msg;
            }

            if (!brandEmpty) {
                msg = { message: 'O campo marca é obritatório' };
                return msg;
            }
            if (!priceEmpty) {
                msg = { message: 'O campo preço é obritatório' };
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
        try {
            const product = await repository.getUsersRepositoryById(id);
            if (product === null) {
                msg = "Produto não encontrado!";
                return msg;
            }
            return product;
        } catch (error) {
            console.log(error);
            msg = 'Serviço não disponível no momento, tente novamente mais tarde!';
            return msg;
        }


    }

    static async getProductServiceByName(name) {
        let msg = '';
        try {
            const products = await repository.getProductRepositoryByName(name);
            return products;
        } catch (error) {
            console.log(error);
            msg = 'Serviço não disponível no momento, tente novamente mais tarde!';
            return msg;
        }
    }

    static async patchProductService(user, id) {
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
        try {
            repository.deleteProductRepository(id);
        } catch (error) {
            console.log(error);
            msg = 'Serviço não disponível no momento, tente novamente mais tarde!';
            return msg;
        }
    }

}