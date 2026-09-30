import { Link } from "react-router-dom";
import "./Footer.css";

const currentYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-col">
          <h3>ARKart</h3>
          <p>Shop smarter. Live better. Discover quality products at unbeatable prices.</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">All Products</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Customer Care</h4>
          <ul>
            <li><Link to="/orders">My Orders</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/profile">My Account</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Categories</h4>
          <ul>
            <li><Link to="/products?category=electronics">Electronics</Link></li>
            <li><Link to="/products?category=fashion">Fashion</Link></li>
            <li><Link to="/products?category=shoes">Shoes</Link></li>
            <li><Link to="/products?category=beauty">Beauty</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} ARKart. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
