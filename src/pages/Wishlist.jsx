import { useContext } from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { WishlistContext } from "../context/WishlistContext";
import { CartContext } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import ProductCard from "../components/ProductCard";
import "./Wishlist.css";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);
  const { addToast } = useToast();

  const handleMoveAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart(product, 1);
    });
    addToast(`Moved all ${wishlist.length} saved items to your cart!`, "cart");
  };

  const handleClearWishlist = () => {
    if (window.confirm("Are you sure you want to remove all items from your wishlist?")) {
      wishlist.forEach((item) => removeFromWishlist(item.id));
      addToast("Wishlist cleared", "success");
    }
  };

  return (
    <div className="wishlist-page-container">
      <div className="wishlist-header-row">
        <div>
          <h1 className="wishlist-title">My Wishlist</h1>
          <p className="wishlist-subtitle">
            {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>

        {wishlist.length > 0 && (
          <div className="wishlist-actions-bar">
            <button
              onClick={handleMoveAllToCart}
              className="move-all-cart-btn"
            >
              <ShoppingBag size={16} />
              <span>Add All to Cart</span>
            </button>

            <button
              onClick={handleClearWishlist}
              className="clear-wishlist-btn"
              title="Clear all"
            >
              <Trash2 size={16} />
              <span>Clear</span>
            </button>

            <Link to="/products" className="continue-link">
              <span>Explore More</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty-card">
          <div className="wishlist-empty-icon">
            <Heart size={40} fill="#ef4444" />
          </div>

          <h2>Your Wishlist is Empty</h2>
          <p>
            Explore our collection and click the heart icon on any product to save your favorite items here for future purchase.
          </p>

          <Link to="/products" className="wishlist-discover-btn">
            <span>Discover Products</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div className="products-grid">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
