import productsModels from '../models/products.models.js';

const getAllProducts = async (category) => {
  if (category) {
    return await productsModels.searchByCategory(category);
  }
  return await productsModels.getProducts();
};

const getProductById = async (id) => {
  return await productsModels.getProductById(id);
};

const addProduct = async (product) => {
  return await productsModels.addProduct(product);
};

const deleteProduct = async (id) => {
  return await productsModels.deletePoproduct(id);
};

const productsServices = {
  getAllProducts,
  getProductById,
  addProduct,
  deleteProduct,
};

export default productsServices;
