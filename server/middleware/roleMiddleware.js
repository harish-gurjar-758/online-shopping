export const isAdmin = (req, res, next) => {
  if (req.user?.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Admins only.' });
  }
};

export const isSeller = (req, res, next) => {
  if (req.user?.role === 'seller') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Sellers only.' });
  }
};

export const isTransporter = (req, res, next) => {
  if (req.user?.role === 'transporter') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Transporters only.' });
  }
};
