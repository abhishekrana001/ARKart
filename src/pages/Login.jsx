import { useState, useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { 
  Lock, 
  Mail, 
  User, 
  Phone, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

function Login() {
  const { currentUser, login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isRegisterParam = new URLSearchParams(location.search).get("mode") === "register";
  const [isRegister, setIsRegister] = useState(isRegisterParam);

  // Form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form states
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Messages
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // If already logged in, redirect to profile
  if (currentUser) {
    return (
      <div className="auth-container">
        <div className="auth-card" style={{ textAlign: "center" }}>
          <div className="auth-avatar-circle">
            <CheckCircle2 size={40} color="#10b981" />
          </div>
          <h2>You are already logged in!</h2>
          <p style={{ color: "var(--text-muted)", margin: "8px 0 24px" }}>
            Signed in as <strong>{currentUser.name}</strong> ({currentUser.email})
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <Link to="/profile" className="auth-btn-primary">
              View Profile
            </Link>
            <Link to="/products" className="auth-btn-secondary">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!loginEmail.trim() || !loginPassword) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    const res = login(loginEmail, loginPassword);
    if (res.success) {
      setSuccessMsg("Logged in successfully! Redirecting...");
      setTimeout(() => {
        navigate("/profile");
      }, 800);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!regName.trim() || !regEmail.trim() || !regPassword) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    if (regPassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    const res = register({
      name: regName,
      email: regEmail,
      password: regPassword,
      phone: regPhone,
    });

    if (res.success) {
      setSuccessMsg("Account created successfully! Welcome to ARKart.");
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleDemoAutofill = () => {
    setLoginEmail("abhishek@arkart.com");
    setLoginPassword("password123");
    setErrorMsg("");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Auth Brand Header */}
        <div className="auth-header">
          <div className="auth-badge">
            <Sparkles size={14} /> ARKart Account
          </div>
          <h1>{isRegister ? "Create an Account" : "Welcome Back"}</h1>
          <p>
            {isRegister
              ? "Join ARKart to access exclusive perks, track orders, and checkout faster."
              : "Sign in to manage your orders, wishlist, and account preferences."}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${!isRegister ? "active" : ""}`}
            onClick={() => {
              setIsRegister(false);
              setErrorMsg("");
              setSuccessMsg("");
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab ${isRegister ? "active" : ""}`}
            onClick={() => {
              setIsRegister(true);
              setErrorMsg("");
              setSuccessMsg("");
            }}
          >
            Create Account
          </button>
        </div>

        {/* Feedback Banners */}
        {errorMsg && <div className="auth-banner error">{errorMsg}</div>}
        {successMsg && <div className="auth-banner success">{successMsg}</div>}

        {/* --- SIGN IN FORM --- */}
        {!isRegister ? (
          <form className="auth-form" onSubmit={handleLoginSubmit}>
            <div className="auth-input-group">
              <label>Email Address</label>
              <div className="auth-input-wrapper">
                <Mail size={18} className="auth-input-icon" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label>Password</label>
              <div className="auth-input-wrapper">
                <Lock size={18} className="auth-input-icon" />
                <input
                  type={showLoginPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              <span>Sign In</span>
              <ArrowRight size={18} />
            </button>

            {/* Demo user 1-click test button */}
            <div className="demo-autofill-box">
              <button
                type="button"
                className="demo-autofill-btn"
                onClick={handleDemoAutofill}
              >
                ⚡ Autofill Demo Credentials (abhishek@arkart.com)
              </button>
            </div>
          </form>
        ) : (
          /* --- REGISTER FORM --- */
          <form className="auth-form" onSubmit={handleRegisterSubmit}>
            <div className="auth-input-group">
              <label>Full Name *</label>
              <div className="auth-input-wrapper">
                <User size={18} className="auth-input-icon" />
                <input
                  type="text"
                  placeholder="e.g. Abhishek Sharma"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label>Email Address *</label>
              <div className="auth-input-wrapper">
                <Mail size={18} className="auth-input-icon" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label>Phone Number (Optional)</label>
              <div className="auth-input-wrapper">
                <Phone size={18} className="auth-input-icon" />
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-input-group">
              <label>Password (Min. 6 characters) *</label>
              <div className="auth-input-wrapper">
                <Lock size={18} className="auth-input-icon" />
                <input
                  type={showRegPassword ? "text" : "password"}
                  placeholder="Create a strong password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showRegPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="auth-input-group">
              <label>Confirm Password *</label>
              <div className="auth-input-wrapper">
                <Lock size={18} className="auth-input-icon" />
                <input
                  type={showRegPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="auth-submit-btn">
              <span>Create Free Account</span>
              <ArrowRight size={18} />
            </button>
          </form>
        )}

        <div className="auth-footer-note">
          <ShieldCheck size={16} />
          <span>Your data is stored securely in your local browser session</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
