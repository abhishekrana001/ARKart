import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingBag, Check, Heart } from "lucide-react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { useToast } from "../context/ToastContext";

function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const { addToast } = useToast();
  const [added, setAdded] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product, 1);
    addToast(`Added "${product.name}" to cart!`, "cart");

    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggleWishlist(product);
    if (!isWishlisted) {
      addToast(`Added to your Wishlist!`, "heart");
    } else {
      addToast(`Removed from your Wishlist`, "success");
    }
  };

  const originalPrice = Math.round(product.price * 1.35);
  const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <div className="product-card">
      <button
        className={`wishlist-btn ${isWishlisted ? "active" : ""}`}
        onClick={handleToggleWishlist}
        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-label="Wishlist"
      >
        <Heart size={18} fill={isWishlisted ? "#ef4444" : "none"} color={isWishlisted ? "#ef4444" : "var(--text-muted)"} />
      </button>

      <Link to={`/products/${product.id}`} className="product-card-link">
        <div className="product-image-box">
          <img src={product.image} alt={product.name} loading="lazy" />
          <span className="discount-tag">-{discountPercent}%</span>
        </div>

        <div className="product-card-body">
          <div className="product-meta">
            <span className="product-category-label">{product.category}</span>
            <div className="product-rating">
              <Star size={13} className="star-icon" fill="#f59e0b" color="#f59e0b" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="product-title" title={product.name}>
            {product.name}
          </h3>

          <div className="product-price-row">
            <div className="price-group">
              <span className="current-price">₹{product.price.toLocaleString("en-IN")}</span>
              <span className="original-price">₹{originalPrice.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </Link>

      <div className="product-card-footer">
        <button
          className={`card-cart-btn ${added ? "added" : ""}`}
          onClick={handleAddToCart}
          disabled={added}
        >
          {added ? (
            <>
              <Check size={16} />
              <span>Added</span>
            </>
          ) : (
            <>
              <ShoppingBag size={16} />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;