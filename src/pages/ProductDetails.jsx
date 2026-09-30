import { useParams } from "react-router-dom";
import products from "../data/products";
import "./ProductDetails.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function ProductDetails() {
  const { cart, setCart } = useContext(CartContext);
  const { id } = useParams();

  const product = products.find(
    (product) => product.id === Number(id)
  );

  const addToCart = () => {
  const existingProduct = cart.find(
    (item) => item.id === product.id
  );

  if (existingProduct) {
    setCart(
      cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="product-details">
    <div className="product-details-image">
        <img src={product.image} alt={product.name} />
    </div>

    <div className="product-details-info">
        <h1>{product.name}</h1>

        <p>⭐ {product.rating}</p>

        <h2>₹{product.price}</h2>

        <p>
        This is a high-quality product available at ARKart.
        </p>

        <button onClick={addToCart}>Add to Cart</button>
    </div>
    </div>
  );
}

export default ProductDetails;