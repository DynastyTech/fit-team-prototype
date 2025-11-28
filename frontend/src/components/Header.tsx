import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Moon, Sun, Menu, X, Dumbbell } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/" className="logo">
            <Dumbbell size={32} />
            <span>FitTeam</span>
          </Link>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/products" onClick={() => setIsMenuOpen(false)}>Products</Link></li>
            <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
          </ul>

          <div className="nav-actions">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </motion.div>
            </button>

            <Link to="/cart" className="cart-button">
              <ShoppingCart size={24} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    className="cart-badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>

            <button
              className="menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

