import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";
import { useNavigate, Link } from "react-router-dom";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Tag,
  Check,
  X
} from "lucide-react";
import { useToast } from "../context/ToastContext";

function Cart() {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    couponCode,
    appliedDiscount,
    rawSubtotal,
    finalTotal,
    totalItemCount,
    applyCoupon,
    removeCoupon
  } = useContext(CartContext);

  const { addToast } = useToast();
  const [inputCoupon, setInputCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState("");

  const handleRemove = (product) => {
    removeFromCart(product.id);
    addToast(`Removed "${product.name}" from cart`, "success");
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;

    const res = applyCoupon(inputCoupon);
    setCouponMsg(res.message);
    if (res.success) {
      addToast(res.message, "success");
      setInputCoupon("");
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponMsg("");
    addToast("Coupon removed", "success");
  };

  return (
    <div className="cart-page-wrapper">
      <div className="cart-header-title">
        <h1>Shopping Cart</h1>
        <span className="cart-count-subtitle">
          {totalItemCount} {totalItemCount === 1 ? "item" : "items"} ready for checkout
        </span>
      </div>

      {cart.length === 0 ? (
        <div className="cart-empty-card">
          <div className="empty-cart-icon">
            <ShoppingBag size={56} />
          </div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className="empty-cart-btn">
            Explore Catalog <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div className="cart-main-grid">
          {/* Items Column */}
          <div className="cart-items-container">
            {cart.map((product) => (
              <div className="cart-item-card" key={product.id}>
                <div className="cart-item-image">
                  <img src={product.image} alt={product.name} />
                </div>

                <div className="cart-item-details">
                  <div className="item-top-row">
                    <span className="cart-item-cat">{product.category}</span>
                    <button
                      className="cart-remove-icon-btn"
                      onClick={() => handleRemove(product)}
                      title="Remove product"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <Link to={`/products/${product.id}`} className="cart-item-title">
                    {product.name}
                  </Link>

                  <div className="cart-item-bottom-row">
                    <div className="cart-quantity-selector">
                      <button
                        onClick={() => decreaseQuantity(product.id)}
                        disabled={product.quantity <= 1}
                        aria-label="Decrease"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="cart-qty-value">{product.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(product.id)}
                        aria-label="Increase"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="cart-item-pricing">
                      <span className="item-unit-price">
                        ₹{product.price.toLocaleString("en-IN")} each
                      </span>
                      <span className="item-total-price">
                        ₹{(product.price * product.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="cart-bottom-actions">
              <Link to="/products" className="continue-shopping-link">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          {/* Summary Column */}
          <div className="cart-summary-col">
            <div className="cart-summary-card">
              <h3>Order Summary</h3>

              {/* Promo Code Form */}
              {couponCode ? (
                <div className="applied-coupon-pill">
                  <div className="coupon-info">
                    <Check size={16} color="var(--success)" />
                    <span>Coupon <strong>{couponCode}</strong> applied</span>
                  </div>
                  <button onClick={handleRemoveCoupon} className="remove-coupon-btn" title="Remove coupon">
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <form className="promo-form" onSubmit={handleApplyCoupon}>
                  <div className="promo-input-wrap">
                    <Tag size={16} className="tag-icon" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. ARKART15)"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                    />
                  </div>
                  <button type="submit">Apply</button>
                </form>
              )}

              {couponMsg && !couponCode && (
                <p className="promo-feedback error">{couponMsg}</p>
              )}

              <div className="summary-breakdown">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>₹{rawSubtotal.toLocaleString("en-IN")}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="summary-line discount">
                    <span>Discount ({couponCode})</span>
                    <span>-₹{appliedDiscount.toLocaleString("en-IN")}</span>
                  </div>
                )}

                <div className="summary-line">
                  <span>Estimated Delivery</span>
                  <span className="free-shipping">FREE</span>
                </div>

                <div className="summary-divider" />

                <div className="summary-total-line">
                  <span>Total Amount</span>
                  <span className="final-price">₹{finalTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>

              <div className="checkout-trust-badge">
                <ShieldCheck size={18} />
                <span>100% Safe & Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;