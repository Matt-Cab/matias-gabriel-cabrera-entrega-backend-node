import { Router } from 'express';
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} from '../controllers/products.controller.js';
import { authentication } from '../middlewares/authentication.js';

const router = Router();

router.get('/products', getAllProducts);

router.get('/products/:id', getProductById);

router.post('/products/create', authentication, addProduct);

router.delete('/products/:id', authentication, deleteProduct);

export default router;
