import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

function Cart() {
    const navigate = useNavigate();
  const { cart, setCart } = useContext(CartContext);

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

    const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
        0
    );

  return (
    <section className="cart-page">
      <h1>My Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((product) => (
          <div className="cart-item" key={product.id}>
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <div className="quantity-controls">
                <button onClick={() => decreaseQuantity(product.id)}>
                    -
                </button>

                <span>{product.quantity}</span>

                <button onClick={() => increaseQuantity(product.id)}>
                    +
                </button>
            </div>

            <button 
                className="remove-btn"
                onClick={() => removeFromCart(product.id)}>
                Remove
            </button>
          </div>   
        ))
      )}
      <div className="cart-total">
        <h2>Total: ₹{totalPrice}</h2>
        <button onClick={() => Navigate("/checkout")}>
            Proceed to Checkout
        </button>
      </div>
    </section>
  );
}

export default Cart;