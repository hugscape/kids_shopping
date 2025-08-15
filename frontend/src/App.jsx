import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import OAuthCallback from './pages/OAuthCallback';
import Cart from './components/Cart';
import { useCart } from './contexts/CartContext';

function App() {
  const { isOpen, closeCart } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/auth/callback" element={<OAuthCallback />} />
        </Routes>
      </main>
      
      <Footer />
      
      {/* Cart Sidebar */}
      <Cart isOpen={isOpen} onClose={closeCart} />
    </div>
  );
}

export default App;
