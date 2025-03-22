import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import { assets } from '../asset/asset';
import RelatedProduct from '../component/Relatedproduct';

const Product = () => {
  const { products, addToCart } = useContext(ShopContext); // Context function to add to cart
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(''); // For size selection
  const [error, setError] = useState('');

  useEffect(() => {
    if (products && products.length > 0) {
      const selectedProduct = products.find((item) => item.id === productId);
      if (selectedProduct) {
        setProduct(selectedProduct);
        setCurrentImage(selectedProduct.image || null);
      }
    }
  }, [products, productId]);

  if (!product) return <div>Loading...</div>;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size.');
      return;
    }
    setError('');
    addToCart(product.id, selectedSize); // Passing product ID and selected size
  };

  const rating = 4; // Example rating
  const totalStars = 5;

  return (
    <div className="product-detail-container p-6 flex flex-col gap-8">
      {/* Top Section: Images and Product Details */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Thumbnails */}
        <div className="thumbnails flex flex-col items-start w-1/5 gap-4">
          {product.image && (
            <img
              src={product.image}
              alt="Product thumbnail"
              onClick={() => setCurrentImage(product.image)}
              className={`w-20 h-20 cursor-pointer rounded-md shadow-md ${
                currentImage === product.image ? 'border-2 border-blue-500' : ''
              }`}
            />
          )}
        </div>

        {/* Main Content */}
        <div className="main-content flex flex-col md:flex-row items-stretch gap-8 w-4/5">
          {/* Main Image */}
          <div className="main-image flex justify-center items-center w-1/2 h-full">
            <img
              src={currentImage || 'placeholder-image-url.jpg'}
              alt={product.name}
              className="max-w-md w-full h-full object-contain rounded-lg shadow-md"
            />
          </div>

          {/* Product Details */}
          <div className="details-section flex flex-col w-1/2">
            <div>
              <h1 className="text-3xl font-bold mb-4 text-left">{product.name}</h1>

              {/* Star Rating */}
              <div className="flex items-center mb-4">
                {Array.from({ length: totalStars }).map((_, index) => (
                  <img
                    key={index}
                    src={rating > index ? assets.star : assets.dull_star}
                    alt={`star ${index + 1}`}
                    className="w-6 h-6"
                  />
                ))}
                <p className="ml-2 text-sm text-gray-600">(122)</p>
              </div>

              <p className="text-gray-600 mb-4">
                {product.description || 'No description available.'}
              </p>
              <p className="text-xl font-semibold text-green-600 mb-4">
                Price: ${product.price}
              </p>

              {/* Size Selection */}
              <div className="size-selection mb-4">
                <label htmlFor="size" className="text-lg font-semibold block mb-2">
                  Select Size:
                </label>
                <select
                  id="size"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="p-2 border rounded-md"
                >
                  <option value="">Choose a size</option>
                  {product.sizes?.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
                {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 w-36"
            >
              Add to Cart
            </button>
            <hr className="my-4" />
            <div>
              <p>100% Original product</p>
              <p>Cash on delivery is available for this product</p>
              <p>Easy return and exchange policy within 7 days</p>
            </div>
          </div>
        </div>
      </div>

{/* Description and Review Section */}
<div className="description-review-section mt-4 flex flex-col md:flex-row gap-4">
  {/* Reviews */}
  <div className="flex-1 pr-4">
    <h2 className="text-lg font-semibold mb-1 text-left inline-block px-3 py-1 bg-white shadow-sm rounded">
      Reviews (122)
    </h2>
    <p className="text-gray-600">122 reviews from verified buyers. Average rating: 4 out of 5 stars.</p>
  </div>

  {/* Description */}
  <div className="flex-1 pl-4">
    <h2 className="text-lg font-semibold mb-1 text-left inline-block px-3 py-1 bg-white shadow-sm rounded">
      Description
    </h2>
    <p className="text-gray-600">
      
        This product comes with superior quality, designed for your satisfaction and comfort. Ideal for all seasons and versatile use.
    </p>
  </div>
  </div>

  <RelatedProduct category={product.category} products={products} />



  </div>
  );
};

export default Product;
