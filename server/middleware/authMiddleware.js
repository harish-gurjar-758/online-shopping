import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ error: 'Unauthorized: No token' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) return res.status(401).json({ error: 'User not found' });

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};


export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user?.role === 'admin') return next();
  res.status(403).json({ error: 'Access denied: Admin only' });
};

export const isCustomer = (req, res, next) => {
  if (req.user?.role === 'customer') return next();
  res.status(403).json({ error: 'Access denied: Customer only' });
};

export const isTransporter = (req, res, next) => {
  if (req.user?.role === 'transporter') return next();
  res.status(403).json({ error: 'Access denied: Transporter only' });
};