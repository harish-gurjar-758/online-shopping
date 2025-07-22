import express from 'express';
import {
    placeOrder,
    getAllOrders,
    getOrdersByCustomer,
    updatePaymentStatus,
    updateDeliveryStatus,
    assignTransporter
} from '../controllers/orderController.js';
import { verifyToken, isAdmin, isCustomer, isTransporter } from '../middleware/authMiddleware.js';

const router = express.Router();

// 🔒 Auth middleware required for all order actions

// 1️⃣ Customer - Place Order
router.post('/place', verifyToken, isCustomer, placeOrder);

// 2️⃣ Admin - Get all orders
router.get('/all', verifyToken, isAdmin, getAllOrders);

// 3️⃣ Customer - Get orders by their ID
router.get('/customer/:id', verifyToken, isCustomer, getOrdersByCustomer);

// 4️⃣ Admin or Customer - Update payment status
router.put('/payment-status', verifyToken, updatePaymentStatus);

// 5️⃣ Transporter or Admin - Update delivery status
router.put('/delivery-status', verifyToken, updateDeliveryStatus);

// 6️⃣ Admin - Assign transporter
router.put('/assign-transporter', verifyToken, isAdmin, assignTransporter);

export default router;
