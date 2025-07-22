import express from 'express';
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
} from '../controllers/productController.js';
import upload from '../uploads/productImageUpload.js';

const router = express.Router();

router.post('/create', upload.array('images', 6), createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/category/:category', getProductsByCategory);

export default router;
