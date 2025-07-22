import Cart from "../models/cart.js";

// Add or update product in cart
export const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [{ productId, quantity }] });
        } else {
            const index = cart.items.findIndex(item => item.productId.toString() === productId);
            if (index > -1) {
                cart.items[index].quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
        }

        await cart.save();
        res.status(200).json({ success: true, message: "Item added/updated", cart });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to update cart" });
    }
};

// Get current user's cart
export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id }).populate("items.productId");
        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch cart" });
    }
};

// Remove item from cart
export const removeItemFromCart = async (req, res) => {
    const { productId } = req.params;

    try {
        const cart = await Cart.findOne({ userId: req.user._id });

        if (!cart) return res.status(404).json({ success: false, error: "Cart not found" });

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);
        await cart.save();

        res.status(200).json({ success: true, message: "Item removed", cart });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to remove item" });
    }
};

// Clear cart
export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id });

        if (!cart) return res.status(404).json({ success: false, error: "Cart not found" });

        cart.items = [];
        await cart.save();

        res.status(200).json({ success: true, message: "Cart cleared", cart });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to clear cart" });
    }
};
