import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Package, Mail } from 'lucide-react';
import './OrderSuccess.css';

const OrderSuccess: React.FC = () => {
  const location = useLocation();
  const orderId = location.state?.orderId || 'N/A';

  return (
    <div className="order-success-page">
      <div className="container">
        <motion.div
          className="success-content"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle size={80} className="success-icon" />
          </motion.div>

          <h1>Order Placed Successfully!</h1>
          <p className="order-number">Order ID: {orderId}</p>

          <div className="success-message">
            <p>
              Thank you for your purchase! We've received your order and will start processing it right away.
              You'll receive a confirmation email shortly with your order details and tracking information.
            </p>
          </div>

          <div className="next-steps">
            <div className="step">
              <Mail size={32} />
              <h3>Check Your Email</h3>
              <p>We've sent a confirmation to your email address</p>
            </div>
            <div className="step">
              <Package size={32} />
              <h3>Track Your Order</h3>
              <p>You'll receive tracking info when your order ships</p>
            </div>
          </div>

          <div className="action-buttons">
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
            <Link to="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccess;

