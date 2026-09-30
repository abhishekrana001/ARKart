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
  Tag 
} from "lucide-react";

function Cart() {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const rawSubtotal = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "ARKART15") {
      const discount = Math.round(rawSubtotal * 0.15);
      setAppliedDiscount(discount);
      setCouponMsg("Promo code ARKART15 applied! 15% saved.");
    } else {
      setCouponMsg("Invalid promo code. Try 'ARKART15'");
    }
  };

  const finalTotal = Math.max(0, rawSubtotal - appliedDiscount);
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

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
                      onClick={() => removeFromCart(product.id)}
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
              <form className="promo-form" onSubmit={handleApplyCoupon}>
                <div className="promo-input-wrap">
                  <Tag size={16} className="tag-icon" />
                  <input
                    type="text"
                    placeholder="Promo code (e.g. ARKART15)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                </div>
                <button type="submit">Apply</button>
              </form>

              {couponMsg && (
                <p className={`promo-feedback ${appliedDiscount > 0 ? "success" : "error"}`}>
                  {couponMsg}
                </p>
              )}

              <div className="summary-breakdown">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>₹{rawSubtotal.toLocaleString("en-IN")}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="summary-line discount">
                    <span>Discount (ARKART15)</span>
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