import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Checkout.css";

function Checkout() {
  const { cart } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <section className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-summary">
        <h2>Order Summary</h2>

        {cart.map((product) => (
          <div key={product.id}>
            <p>
              {product.name} × {product.quantity}
            </p>
            <p>₹{product.price * product.quantity}</p>
          </div>
        ))}

        <h3>Total: ₹{totalPrice}</h3>
      </div>

      <div className="checkout-form">
        <h2>Delivery Details</h2>

        <input type="text" placeholder="Full Name" />
        <input type="text" placeholder="Address" />
        <input type="text" placeholder="City" />
        <input type="text" placeholder="Phone Number" />

        <button>Place Order</button>
      </div>
    </section>
  );
}

export default Checkout;