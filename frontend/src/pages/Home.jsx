import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Truck, Shield, Heart } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { products, loading } = useProducts();
  
  // Get featured products (first 6 products)
  const featuredProducts = products.slice(0, 6);

  const features = [
    {
      icon: <Truck className="h-8 w-8" />,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Quality Guarantee',
      description: '30-day return policy for your peace of mind'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Made with Love',
      description: 'Handcrafted with care for your little ones'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-hugscape-pink via-hugscape-yellow to-hugscape-purple py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-hugscape-blue mb-6">
              Snuggle Up to the Moon
            </h1>
            <p className="text-xl md:text-2xl text-hugscape-gray mb-8">
              Soft, pure cotton nightwear in vibrant Ikkat patterns. Inspired by Indian tradition, 
              made for magical dreams and gentle hugs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="btn-primary text-lg px-8 py-3 inline-block"
              >
                Shop Now
              </Link>
              {/*<Link
                to="/shop?category=nightwear"
                className="btn-outline text-lg px-8 py-3 inline-block"
              >
                View Nightwear
              </Link>*/}
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 text-4xl opacity-20 animation-float">
          🌙
        </div>
        <div className="absolute top-20 right-20 text-3xl opacity-20 animation-float" style={{ animationDelay: '1s' }}>
          ⭐
        </div>
        <div className="absolute bottom-20 left-20 text-2xl opacity-20 animation-float" style={{ animationDelay: '2s' }}>
          ✨
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Hugscape?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We believe every child deserves the comfort and beauty of quality clothing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-white hover:shadow-soft transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 text-primary-600 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and newest arrivals
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              <p className="mt-2 text-gray-600">Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link
              to="/shop"
              className="btn-primary text-lg px-8 py-3 inline-block"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the perfect outfit for every occasion
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Boys', href: '/shop?category=boys', color: 'from-blue-400 to-blue-600', emoji: '👦' },
              { name: 'Girls', href: '/shop?category=girls', color: 'from-pink-400 to-pink-600', emoji: '👧' },
              { name: 'Nightwear', href: '/shop?category=nightwear', color: 'from-purple-400 to-purple-600', emoji: '🌙' },
              { name: 'New Arrivals', href: '/shop?category=new-arrivals', color: 'from-green-400 to-green-600', emoji: '🆕' }
            ].map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="group block"
              >
                <div className={`bg-gradient-to-br ${category.color} rounded-xl p-8 text-center text-white transform group-hover:scale-105 transition-transform duration-300`}>
                  <div className="text-4xl mb-4">{category.emoji}</div>
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Get early access to new collections and exclusive offers
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            />
            <button
              type="submit"
              className="bg-white text-primary-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
