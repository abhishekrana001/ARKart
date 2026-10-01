import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { useToast } from "../context/ToastContext";
import "./Contact.css";

function Contact() {
  const { addToast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [msg, setMsg] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast("Message sent! Our support team will reply shortly.", "success");
  };

  return (
    <div className="contact-page-container">
      <div className="contact-header">
        <span className="contact-badge">
          <MessageSquare size={14} /> Get in Touch
        </span>
        <h1>We'd Love to Hear From You</h1>
        <p>Have questions about your order, tracking, or need product recommendations? Drop us a message.</p>
      </div>

      <div className="contact-main-grid">
        {/* Contact Information Cards */}
        <div className="contact-info-col">
          <div className="contact-channel-card">
            <div className="channel-icon">
              <Mail size={22} />
            </div>
            <div>
              <h3>Email Us</h3>
              <p>support@arkart.com</p>
              <span>Response within 2 hours</span>
            </div>
          </div>

          <div className="contact-channel-card">
            <div className="channel-icon">
              <Phone size={22} />
            </div>
            <div>
              <h3>Call Us</h3>
              <p>+91 (011) 4567-8900</p>
              <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
            </div>
          </div>

          <div className="contact-channel-card">
            <div className="channel-icon">
              <MapPin size={22} />
            </div>
            <div>
              <h3>Headquarters</h3>
              <p>ARKart Commerce Hub, Connaught Place</p>
              <span>New Delhi, India - 110001</span>
            </div>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="contact-form-card">
          {submitted ? (
            <div className="contact-success-box">
              <div className="success-check-icon">
                <CheckCircle2 size={48} />
              </div>
              <h3>Thank you for reaching out!</h3>
              <p>Your message has been received. Our dedicated support team will get in touch with you at <strong>{msg.email}</strong> shortly.</p>
              <button
                className="send-another-btn"
                onClick={() => {
                  setSubmitted(false);
                  setMsg({ name: "", email: "", subject: "", message: "" });
                }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <h2>Send Us a Message</h2>
              <div className="contact-fields-grid">
                <div className="contact-field-group">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Abhishek Sharma"
                    value={msg.name}
                    onChange={(e) => setMsg({ ...msg, name: e.target.value })}
                    required
                  />
                </div>

                <div className="contact-field-group">
                  <label>Your Email *</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={msg.email}
                    onChange={(e) => setMsg({ ...msg, email: e.target.value })}
                    required
                  />
                </div>

                <div className="contact-field-group full-width">
                  <label>Subject</label>
                  <input
                    type="text"
                    placeholder="Order query, Product feedback, etc."
                    value={msg.subject}
                    onChange={(e) => setMsg({ ...msg, subject: e.target.value })}
                  />
                </div>

                <div className="contact-field-group full-width">
                  <label>How can we help you? *</label>
                  <textarea
                    placeholder="Write your message here..."
                    rows={5}
                    value={msg.message}
                    onChange={(e) => setMsg({ ...msg, message: e.target.value })}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="contact-submit-btn">
                <span>Send Message</span>
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Contact;
