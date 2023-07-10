import { TypeProduct } from '../model/models';

export const TypeProductService = {
  createTypeProduct: async data => {
    try {
      const createdTypeProduct = await TypeProduct.create(data);
      return createdTypeProduct;
    } catch (error) {
      throw new Error(`Error creating type product: ${error.message}`);
    }
  },
  getTypeProductById: async typeProductId => {
    try {
      const typeProduct = await TypeProduct.findByPk(typeProductId);
      return typeProduct;
    } catch (error) {
      throw new Error(`Error getting type product by ID: ${error.message}`);
    }
  },
  updateTypeProduct: async (typeProductId, data) => {
    try {
      await TypeProduct.update(data, {
        where: {
          id: typeProductId
        }
      });
      const updatedTypeProduct = await TypeProduct.findByPk(typeProductId);
      return updatedTypeProduct;
    } catch (error) {
      throw new Error(`Error updating type product: ${error.message}`);
    }
  },
  deleteTypeProduct: async typeProductId => {
    try {
      await TypeProduct.destroy({
        where: {
          id: typeProductId
        }
      });
    } catch (error) {
      throw new Error(`Error deleting type product: ${error.message}`);
    }
  },
  getAllTypeProducts: async () => {
    try {
      const typeProducts = await TypeProduct.findAll();
      return typeProducts;
    } catch (error) {
      throw new Error(`Error getting all type products: ${error.message}`);
    }
  }
};
