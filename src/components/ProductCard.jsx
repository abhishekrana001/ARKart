import { Link } from "react-router-dom";

function ProductCard({product}) {

  return (
    <div className='product-card'>
        <div className="product-image">
            <Link to={`/products/${product.id}`}>
              <img src={product.image} alt={product.name} />
            </Link>
        </div>

        <div className="product-info">
            <h3>{product.name}</h3>
            <p>⭐ {product.rating}</p>
            <h4>₹{product.price}</h4>
            <button>Add to Cart</button>
        </div>
    </div>
  )
}

export default ProductCard