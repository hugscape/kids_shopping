import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart, isInCart, getItemQuantity } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select both size and color');
      return;
    }
    
    addToCart(product, selectedSize, selectedColor);
  };

  const currentQuantity = getItemQuantity(product.id, selectedSize, selectedColor);
  const isInCartCurrently = isInCart(product.id, selectedSize, selectedColor);

  return (
    <div className="product-card group">
      {/* Product Image */}
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images?.[0] || '/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = '/placeholder-product.jpg';
            }}
          />
        </Link>
        
        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`absolute top-2 right-2 p-2 rounded-full transition-colors duration-200 ${
            isWishlisted 
              ? 'bg-red-500 text-white' 
              : 'bg-white text-gray-600 hover:bg-red-50'
          }`}
        >
          <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>
        
        {/* Stock Badge */}
        {product.stockQuantity <= 10 && product.stockQuantity > 0 && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
            Low Stock
          </div>
        )}
        
        {product.stockQuantity === 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        {/* Product Name and Price */}
        <div>
          <Link to={`/product/${product.id}`}>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xl font-bold text-primary-600">
              ${product.price}
            </span>
            <div className="flex items-center text-sm text-gray-500">
              <Star className="h-4 w-4 fill-current text-yellow-400 mr-1" />
              <span>4.8</span>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size
            </label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 text-sm rounded-md border transition-colors duration-200 ${
                    selectedSize === size
                      ? 'border-primary-600 bg-primary-50 text-primary-600'
                      : 'border-gray-300 text-gray-700 hover:border-primary-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1 text-sm rounded-md border transition-colors duration-200 ${
                    selectedColor === color
                      ? 'border-primary-600 bg-primary-50 text-primary-600'
                      : 'border-gray-300 text-gray-700 hover:border-primary-300'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!selectedSize || !selectedColor || product.stockQuantity === 0}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
            !selectedSize || !selectedColor || product.stockQuantity === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : isInCartCurrently
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-primary-600 text-white hover:bg-primary-700'
          }`}
        >
          {isInCartCurrently ? (
            <span className="flex items-center justify-center">
              <ShoppingCart className="h-4 w-4 mr-2" />
              In Cart ({currentQuantity})
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </span>
          )}
        </button>

        {/* Stock Info */}
        <p className="text-sm text-gray-500 text-center">
          {product.stockQuantity > 0 
            ? `${product.stockQuantity} in stock`
            : 'Out of stock'
          }
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
