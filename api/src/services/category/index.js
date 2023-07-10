import { CategoryProduct } from '../model/models';

export const CategoryProductService = {
  createCategoryProduct: async data => {
    try {
      const createdCategoryProduct = await CategoryProduct.create(data);
      return createdCategoryProduct;
    } catch (error) {
      throw new Error(`Error creating category product: ${error.message}`);
    }
  },

  getCategoryProductById: async categoryProductId => {
    try {
      const categoryProduct = await CategoryProduct.findByPk(categoryProductId);
      return categoryProduct;
    } catch (error) {
      throw new Error(`Error getting category product by ID: ${error.message}`);
    }
  },

  updateCategoryProduct: async (categoryProductId, data) => {
    try {
      await CategoryProduct.update(data, {
        where: {
          id: categoryProductId
        }
      });
      const updatedCategoryProduct = await CategoryProduct.findByPk(categoryProductId);
      return updatedCategoryProduct;
    } catch (error) {
      throw new Error(`Error updating category product: ${error.message}`);
    }
  },

  deleteCategoryProduct: async categoryProductId => {
    try {
      await CategoryProduct.destroy({
        where: {
          id: categoryProductId
        }
      });
    } catch (error) {
      throw new Error(`Error deleting category product: ${error.message}`);
    }
  },

  getAllCategoryProducts: async () => {
    try {
      const categoryProducts = await CategoryProduct.findAll();
      return categoryProducts;
    } catch (error) {
      throw new Error(`Error getting all category products: ${error.message}`);
    }
  }
};
