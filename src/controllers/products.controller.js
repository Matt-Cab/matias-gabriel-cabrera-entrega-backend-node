import productsServices from '../services/products.services.js';

export const getAllProducts = async (req, res) => {
  const { category } = req.query;
  try {
    const products = await productsServices.getAllProducts(category);

    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Error al intentar obtener la lista de productos`,
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: 'Debe proporcionar in id',
      });
    }

    const product = await productsServices.getProductById(id);

    if (!product) {
      return res.status(404).json({
        message: `Producto con id ${id} no encontrado`,
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Error al intentar obtener el producto con id ${req.params.id}`,
      error: error.message,
    });
  }
};

export const addProduct = async (req, res) => {
  const { category, name, price, stock } = req.body;

  if (!category || !name || !price || !stock) {
    return res.status(400).json({
      message:
        'EL producto debe poseer los siguientes campos: category, name, price y stock',
    });
  }

  try {
    const docRef = await productsServices.addProduct({
      category,
      name,
      price,
      stock,
    });

    return res
      .status(200)
      .json({ message: 'Producto agregado con exito', id: docRef.id });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Error al intentar guardar el producto ${{
        category,
        name,
        price,
        stock,
      }}`,
      error: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: 'Debe proporcionar in id',
      });
    }

    const deletedProduct = await productsServices.deleteProduct(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    } else {
      return res.status(200).json({
        message: `Producto con id ${id} borrado con éxito`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Error al intentar eliminar el producto con id ${req.params.id}`,
      error: error.message,
    });
  }
};
