import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/OrderContext";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { 
  CheckCircle2, 
  CreditCard, 
  Banknote, 
  ShieldCheck, 
  ArrowLeft, 
  ArrowRight,
  PackageCheck
} from "lucide-react";
import "./Checkout.css";

function Checkout() {
  const { cart, setCart } = useContext(CartContext);
  const { orders, setOrders } = useContext(OrderContext);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    address: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [submittedOrder, setSubmittedOrder] = useState(null);
  const [error, setError] = useState("");

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.address.trim() || !formData.city.trim() || !formData.phone.trim()) {
      setError("Please complete all required delivery details.");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    const orderId = "ARK-" + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      customer: { ...formData },
      items: [...cart],
      total: totalPrice,
      paymentMethod: paymentMethod === "cod" ? "Cash on Delivery" : "UPI / Online Payment",
      status: "Confirmed",
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    setSubmittedOrder(newOrder);
    setError("");
  };

  if (submittedOrder) {
    return (
      <div className="checkout-success-wrapper">
        <div className="checkout-success-card">
          <div className="success-icon-badge">
            <CheckCircle2 size={48} />
          </div>

          <span className="success-order-id">Order ID: #{submittedOrder.id}</span>
          <h1>Thank You for Your Order!</h1>
          <p className="success-subtitle">
            A confirmation has been sent for <strong>{submittedOrder.customer.name}</strong>. We are preparing your package for express dispatch.
          </p>

          <div className="success-details-box">
            <div className="success-detail-row">
              <span>Delivery Address:</span>
              <strong>{submittedOrder.customer.address}, {submittedOrder.customer.city} {submittedOrder.customer.pincode}</strong>
            </div>
            <div className="success-detail-row">
              <span>Payment Mode:</span>
              <strong>{submittedOrder.paymentMethod}</strong>
            </div>
            <div className="success-detail-row">
              <span>Total Paid:</span>
              <strong className="success-total">₹{submittedOrder.total.toLocaleString("en-IN")}</strong>
            </div>
          </div>

          <div className="success-cta-group">
            <Link to="/orders" className="success-btn-primary">
              <PackageCheck size={18} />
              <span>Track My Orders</span>
            </Link>
            <Link to="/products" className="success-btn-secondary">
              <span>Continue Shopping</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-empty-state">
        <div className="empty-box">
          <h2>No items to checkout</h2>
          <p>Your cart is currently empty. Explore our catalog and add items to proceed.</p>
          <button onClick={() => navigate("/products")} className="explore-btn">
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page-container">
      <div className="checkout-header-bar">
        <button onClick={() => navigate("/cart")} className="checkout-back-link">
          <ArrowLeft size={16} /> Back to Cart
        </button>
        <h1>Secure Checkout</h1>
      </div>

      <div className="checkout-grid">
        {/* Form Column */}
        <div className="checkout-form-col">
          <form id="checkout-form" onSubmit={handlePlaceOrder}>
            {/* Step 1: Shipping Address */}
            <div className="checkout-section-card">
              <div className="checkout-section-header">
                <span className="step-number">1</span>
                <h3>Shipping & Delivery Address</h3>
              </div>

              {error && <div className="checkout-error-banner">{error}</div>}

              <div className="form-fields-grid">
                <div className="form-group full-width">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. Abhishek Sharma"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number (10 Digits) *</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group full-width">
                  <label>Street Address & Landmark *</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Flat/House No., Colony, Street"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>City & State *</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City, State"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="e.g. 110001"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="checkout-section-card">
              <div className="checkout-section-header">
                <span className="step-number">2</span>
                <h3>Payment Method</h3>
              </div>

              <div className="payment-options-grid">
                <label className={`payment-option ${paymentMethod === "cod" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <Banknote size={22} className="payment-icon" />
                  <div>
                    <strong>Cash on Delivery (COD)</strong>
                    <p>Pay in cash or UPI when your order arrives</p>
                  </div>
                </label>

                <label className={`payment-option ${paymentMethod === "upi" ? "selected" : ""}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                  />
                  <CreditCard size={22} className="payment-icon" />
                  <div>
                    <strong>Online Payment / UPI / Cards</strong>
                    <p>Pay instantly via Google Pay, PhonePe, Cards</p>
                  </div>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary Sticky Column */}
        <div className="checkout-summary-col">
          <div className="checkout-summary-card">
            <h3>Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)</h3>

            <div className="checkout-items-preview">
              {cart.map((product) => (
                <div key={product.id} className="checkout-item-row">
                  <img src={product.image} alt={product.name} />
                  <div className="checkout-item-meta">
                    <span className="checkout-item-name">{product.name}</span>
                    <span className="checkout-item-qty">Qty: {product.quantity}</span>
                  </div>
                  <span className="checkout-item-price">
                    ₹{(product.price * product.quantity).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>

            <div className="checkout-cost-breakdown">
              <div className="cost-row">
                <span>Items Subtotal</span>
                <span>₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="cost-row">
                <span>Shipping Fee</span>
                <span className="free-shipping">FREE</span>
              </div>
              <div className="cost-divider" />
              <div className="cost-total-row">
                <span>Total Amount</span>
                <span className="total-amount">₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <button
              type="submit"
              form="checkout-form"
              className="place-order-submit-btn"
            >
              <span>Place Order (₹{totalPrice.toLocaleString("en-IN")})</span>
              <ArrowRight size={18} />
            </button>

            <div className="checkout-security-note">
              <ShieldCheck size={18} />
              <span>Bank-grade 256-bit SSL encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;