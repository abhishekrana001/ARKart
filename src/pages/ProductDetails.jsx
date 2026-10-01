import { useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Star, 
  ShoppingBag, 
  Check, 
  ArrowLeft, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Plus, 
  Minus, 
  Zap, 
  Heart 
} from "lucide-react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import "./ProductDetails.css";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

const SIZES_MAP = {
  fashion: ["S", "M", "L", "XL"],
  shoes: ["UK 7", "UK 8", "UK 9", "UK 10"],
  electronics: ["Standard", "Pro Edition"],
  accessories: ["One Size"],
  beauty: ["50ml", "100ml"],
};

function ProductDetails() {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { addToast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(0);

  const product = products.find((p) => p.id === Number(id));
  const isWishlisted = product ? isInWishlist(product.id) : false;

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>The product you are looking for is currently unavailable or has been moved.</p>
        <Link to="/products" className="back-btn">
          <ArrowLeft size={16} /> Return to Products
        </Link>
      </div>
    );
  }

  const sizes = SIZES_MAP[product.category] || ["Standard"];
  const originalPrice = Math.round(product.price * 1.35);
  const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    addToast(`Added ${quantity} × "${product.name}" to cart!`, "cart");
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    addToast(`Proceeding to checkout...`, "cart");
    navigate("/checkout");
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    if (!isWishlisted) {
      addToast(`Added to your Wishlist!`, "heart");
    } else {
      addToast(`Removed from your Wishlist`, "success");
    }
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="product-details-container">
      {/* Breadcrumb */}
      <nav className="details-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/products">Products</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`}>
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
        <span>/</span>
        <span className="current">{product.name}</span>
      </nav>

      {/* Main Showcase */}
      <div className="details-main-grid">
        {/* Left: Product Image */}
        <div className="details-image-card">
          <button 
            className={`details-wishlist-btn ${isWishlisted ? "active" : ""}`}
            onClick={handleToggleWishlist}
            aria-label="Wishlist"
          >
            <Heart size={20} fill={isWishlisted ? "#ef4444" : "none"} color={isWishlisted ? "#ef4444" : "var(--text-muted)"} />
          </button>
          <div className="image-zoom-box">
            <img src={product.image} alt={product.name} />
          </div>
          <span className="details-discount-pill">Save {discountPercent}%</span>
        </div>

        {/* Right: Info & Purchase Controls */}
        <div className="details-info-box">
          <div className="details-category-tag">{product.category}</div>
          <h1 className="details-title">{product.name}</h1>

          <div className="details-rating-row">
            <div className="rating-pill">
              <Star size={15} fill="#f59e0b" color="#f59e0b" />
              <span>{product.rating}</span>
            </div>
            <span className="review-count">{product.reviewsCount || 128} Verified Ratings & Reviews</span>
            <span className="stock-pill">In Stock</span>
          </div>

          <div className="details-pricing">
            <div className="price-main">
              <span className="symbol">₹</span>
              <span className="value">{product.price.toLocaleString("en-IN")}</span>
            </div>
            <span className="original-strike">₹{originalPrice.toLocaleString("en-IN")}</span>
            <span className="discount-badge">SAVE ₹{(originalPrice - product.price).toLocaleString("en-IN")}</span>
          </div>

          <p className="inclusive-tax">Inclusive of all applicable taxes • Free Express Shipping</p>

          <div className="details-desc-box">
            <h3>Overview</h3>
            <p>{product.description || "Designed with premium quality materials, delivering exceptional comfort and performance for daily use."}</p>
          </div>

          {/* Size / Variant Options */}
          {sizes.length > 1 && (
            <div className="variant-section">
              <span className="variant-label">Select Option:</span>
              <div className="variant-options">
                {sizes.map((s, idx) => (
                  <button
                    key={s}
                    type="button"
                    className={`variant-chip ${selectedSize === idx ? "active" : ""}`}
                    onClick={() => setSelectedSize(idx)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Controls */}
          <div className="quantity-section">
            <span className="quantity-label">Quantity:</span>
            <div className="quantity-stepper">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease"
              >
                <Minus size={16} />
              </button>
              <span className="qty-number">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="details-cta-group">
            <button
              className={`details-add-btn ${added ? "added" : ""}`}
              onClick={handleAddToCart}
              disabled={added}
            >
              {added ? (
                <>
                  <Check size={20} />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={20} />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button className="details-buy-btn" onClick={handleBuyNow}>
              <Zap size={20} />
              <span>Buy Now</span>
            </button>
          </div>

          {/* Key Value Highlights */}
          <div className="details-perks-grid">
            <div className="perk-item">
              <Truck size={20} className="perk-icon" />
              <div>
                <strong>Free Delivery</strong>
                <p>Delivered in 2-3 business days</p>
              </div>
            </div>
            <div className="perk-item">
              <ShieldCheck size={20} className="perk-icon" />
              <div>
                <strong>1 Year Warranty</strong>
                <p>Authentic brand guarantee</p>
              </div>
            </div>
            <div className="perk-item">
              <RotateCcw size={20} className="perk-icon" />
              <div>
                <strong>7-Day Returns</strong>
                <p>Instant contactless refund</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="related-section">
          <h2>Similar Recommendations</h2>
          <div className="related-grid">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;