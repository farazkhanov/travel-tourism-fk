import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
  Plane,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const AuthModal = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    switchAuthMode,
    login,
    register,
  } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isAuthModalOpen) {
      setFormData({ name: "", email: "", password: "" });
      setErrors({});
      setShowPassword(false);
    }
  }, [isAuthModalOpen, authModalMode]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeAuthModal();
    };
    if (isAuthModalOpen) window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isAuthModalOpen, closeAuthModal]);

  const validate = () => {
    const newErrors = {};
    if (authModalMode === "register" && !formData.name.trim()) {
      newErrors.name = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      let result;
      if (authModalMode === "login") {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(formData.name, formData.email, formData.password);
      }
      
      // The modal will close automatically via closeAuthModal() in login/register functions
      // Only keep submitting state false if there was an error
      if (!result.success) {
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Auth error:', error);
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  if (!isAuthModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeAuthModal}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          backdropFilter: "blur(4px)",
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            width: "100%",
            maxWidth: "440px",
            maxHeight: "90vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #059669, #0d9488, #0e7490)",
              padding: "1.75rem 2rem",
              position: "relative",
              flexShrink: 0,
              textAlign: "center",
            }}
          >
            <button
              onClick={closeAuthModal}
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X style={{ width: "16px", height: "16px", color: "#ffffff" }} />
            </button>

            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 0.75rem",
              }}
            >
              <Plane style={{ width: "24px", height: "24px", color: "#ffffff" }} />
            </div>
            <h2
              style={{
                color: "#ffffff",
                fontSize: "1.4rem",
                fontWeight: "800",
                margin: 0,
              }}
            >
              {authModalMode === "login" ? "Welcome Back!" : "Join the Adventure"}
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "0.875rem",
                margin: "4px 0 0",
              }}
            >
              {authModalMode === "login"
                ? "Sign in to continue exploring Pakistan"
                : "Create your account and start traveling"}
            </p>
          </div>

          {/* Body */}
          <div style={{ overflowY: "auto", padding: "1.75rem 2rem 2rem" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              {authModalMode === "register" && (
                <Field label="Full Name" error={errors.name}>
                  <InputWithIcon
                    icon={User}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Faraz Khan"
                    error={errors.name}
                  />
                </Field>
              )}

              <Field label="Email Address" error={errors.email}>
                <InputWithIcon
                  icon={Mail}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  error={errors.email}
                />
              </Field>

              <Field label="Password" error={errors.password}>
                <div style={{ position: "relative" }}>
                  <InputWithIcon
                    icon={Lock}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    error={errors.password}
                    rightPadding
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      color: "#94a3b8",
                    }}
                  >
                    {showPassword ? (
                      <EyeOff style={{ width: "18px", height: "18px" }} />
                    ) : (
                      <Eye style={{ width: "18px", height: "18px" }} />
                    )}
                  </button>
                </div>
              </Field>

              {authModalMode === "login" && (
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "-0.5rem" }}>
                  <button
                    type="button"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.8rem",
                      fontWeight: "600",
                      color: "#059669",
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  width: "100%",
                  padding: "0.85rem",
                  borderRadius: "12px",
                  border: "none",
                  background: isSubmitting
                    ? "#6ee7b7"
                    : "linear-gradient(135deg, #059669, #0d9488)",
                  color: "#ffffff",
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  boxShadow: "0 4px 15px rgba(5,150,105,0.35)",
                }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 style={{ width: "18px", height: "18px", animation: "spin 1s linear infinite" }} />
                    Please wait...
                  </>
                ) : authModalMode === "login" ? (
                  <>
                    <Sparkles style={{ width: "18px", height: "18px" }} />
                    Sign In
                  </>
                ) : (
                  <>
                    <Sparkles style={{ width: "18px", height: "18px" }} />
                    Create Account
                  </>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "1.25rem 0" }}>
              <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
              <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>or continue with</span>
              <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
            </div>

            {/* Social buttons */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <SocialButton label="Google">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              </SocialButton>
              <SocialButton label="Facebook">
                <svg width="18" height="18" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
              </SocialButton>
            </div>

            {/* Switch Mode */}
            <p style={{ marginTop: "1.5rem", textAlign: "center", fontSize: "0.875rem", color: "#64748b" }}>
              {authModalMode === "login" ? (
                <>
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={switchAuthMode}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "700",
                      color: "#059669",
                    }}
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={switchAuthMode}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "700",
                      color: "#059669",
                    }}
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── Helpers ──────────────────────────────────────────────────────────────
function Field({ label, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "0.85rem", fontWeight: "600", color: "#374151" }}>
        {label}
      </label>
      {children}
      {error && <span style={{ fontSize: "0.78rem", color: "#ef4444" }}>{error}</span>}
    </div>
  );
}

function InputWithIcon({ icon: Icon, error, rightPadding, ...props }) {
  return (
    <div style={{ position: "relative" }}>
      <Icon
        style={{
          position: "absolute",
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "18px",
          height: "18px",
          color: "#94a3b8",
          pointerEvents: "none",
        }}
      />
      <input
        {...props}
        style={{
          width: "100%",
          padding: `0.75rem 1rem 0.75rem 2.5rem`,
          paddingRight: rightPadding ? "2.75rem" : "1rem",
          border: `1.5px solid ${error ? "#ef4444" : "#e2e8f0"}`,
          borderRadius: "10px",
          fontSize: "0.9rem",
          color: "#0f172a",
          background: "#f8fafc",
          outline: "none",
          boxSizing: "border-box",
          fontFamily: "inherit",
        }}
      />
    </div>
  );
}

function SocialButton({ label, children }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "0.65rem",
        borderRadius: "10px",
        border: "1.5px solid #e2e8f0",
        background: "#ffffff",
        fontSize: "0.85rem",
        fontWeight: "600",
        color: "#374151",
        cursor: "pointer",
      }}
    >
      {children}
      {label}
    </motion.button>
  );
}

export default AuthModal;