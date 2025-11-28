import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import OrderSuccess from './pages/OrderSuccess';
import './App.css';

// Handle GitHub Pages query string redirect
function RedirectHandler() {
  const location = useLocation();
  
  // Check if we have the GitHub Pages redirect pattern
  if (location.search.includes('?/')) {
    const path = location.search.replace('?/', '').replace(/~and~/g, '&');
    return <Navigate to={path} replace />;
  }
  
  return null;
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <Router basename="/fit-team-prototype">
          <div className="app">
            <RedirectHandler />
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/about" element={<About />} />
                <Route path="/order-success" element={<OrderSuccess />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
