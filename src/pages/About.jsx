import { Link } from "react-router-dom";

function About() {
  return (
    <section style={{ maxWidth: "800px", margin: "50px auto", padding: "0 20px", lineHeight: "1.7" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>About ARKart</h1>
      <p style={{ fontSize: "17px", color: "#555", marginBottom: "20px" }}>
        Welcome to <strong>ARKart</strong>, your trusted destination for smart shopping. We are committed to bringing you high-quality products spanning electronics, fashion, footwear, beauty, and premium accessories — all at unmatched prices.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", margin: "40px 0" }}>
        <div style={{ padding: "20px", background: "#f5f7fa", borderRadius: "10px" }}>
          <h3>✨ Premium Quality</h3>
          <p style={{ color: "#666", fontSize: "14px" }}>Handpicked products vetted for durability and top performance.</p>
        </div>
        <div style={{ padding: "20px", background: "#f5f7fa", borderRadius: "10px" }}>
          <h3>🚚 Fast Delivery</h3>
          <p style={{ color: "#666", fontSize: "14px" }}>Quick and reliable doorstep dispatch across all locations.</p>
        </div>
        <div style={{ padding: "20px", background: "#f5f7fa", borderRadius: "10px" }}>
          <h3>🛡️ 100% Secure</h3>
          <p style={{ color: "#666", fontSize: "14px" }}>Safe payments and seamless hassle-free checkout experience.</p>
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Link
          to="/products"
          style={{
            padding: "12px 28px",
            background: "#222",
            color: "#fff",
            textDecoration: "none",
            borderRadius: "6px",
            fontWeight: "600",
            display: "inline-block"
          }}
        >
          Explore Collection
        </Link>
      </div>
    </section>
  );
}

export default About;
