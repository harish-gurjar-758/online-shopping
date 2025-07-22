import Order from '../models/Order.js';
import Product from '../models/Product.js';
import User from '../models/User.js';

// 1. Place a new order
export const placeOrder = async (req, res) => {
  try {
    const { customerId, items, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items provided' });
    }

    // Calculate total amount
    const totalAmount = items.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);

    const order = new Order({
      customerId,
      items,
      shippingAddress,
      totalAmount,
    });

    await order.save();
    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ error: 'Failed to place order', details: err.message });
  }
};

// 2. Get all orders (admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customerId', 'name email')
      .populate('assignedTransporter', 'name email');
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// 3. Get orders for a specific customer
export const getOrdersByCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const orders = await Order.find({ customerId });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch customer orders' });
  }
};

// 4. Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!['pending', 'paid', 'failed'].includes(status)) {
      return res.status(400).json({ error: 'Invalid payment status' });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus: status },
      { new: true }
    );

    res.json({ success: true, message: 'Payment status updated', order });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update payment status' });
  }
};

// 5. Update delivery status
export const updateDeliveryStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!['pending', 'shipped', 'in-transit', 'delivered'].includes(status)) {
      return res.status(400).json({ error: 'Invalid delivery status' });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { deliveryStatus: status },
      { new: true }
    );

    res.json({ success: true, message: 'Delivery status updated', order });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update delivery status' });
  }
};

// 6. Assign a transporter
export const assignTransporter = async (req, res) => {
  try {
    const { orderId, transporterId } = req.body;

    const transporter = await User.findById(transporterId);
    if (!transporter || transporter.role !== 'transporter') {
      return res.status(400).json({ error: 'Invalid transporter' });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { assignedTransporter: transporterId },
      { new: true }
    );

    res.json({ success: true, message: 'Transporter assigned', order });
  } catch (err) {
    res.status(500).json({ error: 'Failed to assign transporter' });
  }
};
