import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Headphones, 
  Sparkles,
  ShoppingBag,
  TrendingUp
} from "lucide-react";
import "./Home.css";
import image from "../assets/image.png";
import electronics from "../assets/electronics.png";
import beauty from "../assets/beauty.png";
import shoes from "../assets/shoes.png";
import fashion from "../assets/fashion.png";
import accessories from "../assets/accessories.png";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const CATEGORIES = [
  { name: "Electronics", key: "electronics", image: electronics, desc: "Gadgets & audio" },
  { name: "Fashion", key: "fashion", image: fashion, desc: "Trends & apparel" },
  { name: "Shoes", key: "shoes", image: shoes, desc: "Sneakers & boots" },
  { name: "Beauty", key: "beauty", image: beauty, desc: "Skincare & glam" },
  { name: "Accessories", key: "accessories", image: accessories, desc: "Watches & gear" },
];

function Home() {
  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={16} /> Welcome to ARKart Premium
            </div>
            <h1 className="hero-title">
              Shop Smarter. <br />
              <span className="hero-gradient-text">Live In Style.</span>
            </h1>
            <p className="hero-subtitle">
              Discover curated electronics, trending fashion, and premium lifestyle essentials crafted for modern living at unmatched everyday prices.
            </p>

            <div className="hero-actions">
              <Link to="/products" className="hero-btn-primary">
                <span>Start Shopping</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/products?category=electronics" className="hero-btn-secondary">
                <ShoppingBag size={18} />
                <span>Featured Tech</span>
              </Link>
            </div>

            <div className="hero-trust-row">
              <div className="trust-pill">
                <span className="dot" /> 10,000+ Happy Shoppers
              </div>
              <div className="trust-pill">
                <span className="dot" /> 4.8★ Top Rated Store
              </div>
            </div>
          </div>

          <div className="hero-media">
            <div className="hero-image-glow" />
            <img src={image} alt="ARKart Online Shopping" className="hero-main-img" />
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <section className="trust-features-bar">
        <div className="trust-grid">
          <div className="trust-card">
            <div className="trust-icon-box"><Truck size={24} /></div>
            <div>
              <h4>Free Express Delivery</h4>
              <p>On all orders above ₹499</p>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box"><ShieldCheck size={24} /></div>
            <div>
              <h4>100% Genuine Products</h4>
              <p>Direct from verified brands</p>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box"><RotateCcw size={24} /></div>
            <div>
              <h4>7 Days Easy Return</h4>
              <p>Hassle-free instant refunds</p>
            </div>
          </div>

          <div className="trust-card">
            <div className="trust-icon-box"><Headphones size={24} /></div>
            <div>
              <h4>24/7 Dedicated Support</h4>
              <p>Always here to help you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <div>
            <span className="section-label">Browse by Departments</span>
            <h2 className="section-title">Shop by Category</h2>
          </div>
          <Link to="/products" className="view-all-link">
            <span>View All</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="category-cards-grid">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.key} 
              to={`/products?category=${cat.key}`} 
              className="category-card-item"
            >
              <div className="category-img-container">
                <img src={cat.image} alt={cat.name} />
              </div>
              <div className="category-info">
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
                <span className="explore-tag">
                  Explore <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending / Featured Products Section */}
      <section className="featured-products-section">
        <div className="section-header">
          <div>
            <span className="section-label">
              <TrendingUp size={16} /> Hot Right Now
            </span>
            <h2 className="section-title">Trending Best Sellers</h2>
          </div>
          <Link to="/products" className="view-all-link">
            <span>Browse Catalog</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="featured-grid">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="promo-banner-section">
        <div className="promo-banner-card">
          <div className="promo-content">
            <span className="promo-badge">Limited Time Offer</span>
            <h2>Enjoy Extra 15% OFF On Your First Order</h2>
            <p>Use code <strong>ARKART15</strong> at checkout to claim your exclusive discount.</p>
            <Link to="/products" className="promo-cta-btn">
              Claim Offer Now <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;