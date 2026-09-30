import { useState } from "react";

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [msg, setMsg] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section style={{ maxWidth: "600px", margin: "50px auto", padding: "0 20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>Contact Us</h1>
      <p style={{ textAlign: "center", color: "#666", marginBottom: "30px" }}>
        Have questions about your order or need product advice? We would love to hear from you.
      </p>

      {submitted ? (
        <div style={{
          textAlign: "center",
          padding: "30px",
          background: "#e8f5e9",
          color: "#2e7d32",
          borderRadius: "8px"
        }}>
          <h3>Thank you for reaching out!</h3>
          <p>Our support team will get back to you shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            placeholder="Your Name"
            value={msg.name}
            onChange={(e) => setMsg({ ...msg, name: e.target.value })}
            required
            style={{ padding: "12px", border: "1px solid #ddd", borderRadius: "6px", outline: "none" }}
          />
          <input
            type="email"
            placeholder="Your Email Address"
            value={msg.email}
            onChange={(e) => setMsg({ ...msg, email: e.target.value })}
            required
            style={{ padding: "12px", border: "1px solid #ddd", borderRadius: "6px", outline: "none" }}
          />
          <textarea
            placeholder="How can we help you?"
            rows={5}
            value={msg.message}
            onChange={(e) => setMsg({ ...msg, message: e.target.value })}
            required
            style={{ padding: "12px", border: "1px solid #ddd", borderRadius: "6px", outline: "none", resize: "vertical" }}
          />
          <button
            type="submit"
            style={{
              padding: "12px",
              background: "#222",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Send Message
          </button>
        </form>
      )}
    </section>
  );
}

export default Contact;
