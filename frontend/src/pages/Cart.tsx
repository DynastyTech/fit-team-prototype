import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  const handleQuantityChange = async (itemId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      await updateQuantity(itemId, newQuantity);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ShoppingBag size={80} strokeWidth={1} />
          <h2>Your Cart is Empty</h2>
          <p>Start shopping and add some products to your cart!</p>
          <Link to="/products" className="btn btn-primary">
            Browse Products
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Shopping Cart ({cartCount} items)
        </motion.h1>

        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item, index) => (
              <motion.div
                key={item.id}
                className="cart-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="cart-summary"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="summary-row total">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="btn btn-primary checkout-btn">
              Proceed to Checkout
            </Link>
            <Link to="/products" className="continue-shopping">
              Continue Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

