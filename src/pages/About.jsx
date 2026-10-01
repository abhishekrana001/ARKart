import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck, Truck, Clock, Award, Users, ArrowRight } from "lucide-react";
import "./About.css";

function About() {
  return (
    <div className="about-page-container">
      <div className="about-hero-card">
        <span className="about-badge">
          <Sparkles size={14} /> Our Story & Mission
        </span>
        <h1 className="about-title">Crafted for Smart, Modern Shoppers</h1>
        <p className="about-lead">
          Welcome to <strong>ARKart</strong>, your trusted destination for smart online shopping. We are committed to bringing you high-quality products spanning electronics, fashion, footwear, beauty, and premium accessories — all at unmatched prices.
        </p>
      </div>

      <div className="about-values-grid">
        <div className="about-value-card">
          <div className="about-value-icon">
            <Award size={26} />
          </div>
          <h3>Premium Quality</h3>
          <p>Every product is handpicked and thoroughly vetted for durability, performance, and craftsmanship.</p>
        </div>

        <div className="about-value-card">
          <div className="about-value-icon">
            <Truck size={26} />
          </div>
          <h3>Fast & Reliable Delivery</h3>
          <p>Express dispatch network ensuring your orders reach your doorstep safely and ahead of schedule.</p>
        </div>

        <div className="about-value-card">
          <div className="about-value-icon">
            <ShieldCheck size={26} />
          </div>
          <h3>100% Secure Checkout</h3>
          <p>End-to-end encrypted transactions and seamless contactless payments with verified buyer protection.</p>
        </div>

        <div className="about-value-card">
          <div className="about-value-icon">
            <Clock size={26} />
          </div>
          <h3>24/7 Dedicated Support</h3>
          <p>Our friendly customer support team is always standing by to answer your inquiries and ensure happiness.</p>
        </div>
      </div>

      <div className="about-stats-banner">
        <div className="about-stat-item">
          <strong>10,000+</strong>
          <span>Happy Customers</span>
        </div>
        <div className="about-stat-item">
          <strong>500+</strong>
          <span>Curated Products</span>
        </div>
        <div className="about-stat-item">
          <strong>4.8 ★</strong>
          <span>Average User Rating</span>
        </div>
        <div className="about-stat-item">
          <strong>99.8%</strong>
          <span>On-Time Deliveries</span>
        </div>
      </div>

      <div className="about-cta-section">
        <h2>Ready to upgrade your shopping experience?</h2>
        <p>Explore thousands of trending items curated specifically for your lifestyle.</p>
        <Link to="/products" className="about-explore-btn">
          <span>Explore Catalog</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}

export default About;
