import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Plane, User, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// Section IDs each link maps to
const links = [
  { label: "Home", id: "home" },
  { label: "Features", id: "features" },
  { label: "Destinations", id: "destinations" },
  { label: "Gallery", id: "gallery" },
  { label: "Testimonials", id: "testimonials" },
  { label: "Contact", id: "contact" },
];

// Custom slow smooth scroll — ease-in-out cubic, ~1 second
const slowScrollTo = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const start = window.scrollY;
  const target = el.getBoundingClientRect().top + window.scrollY - 80;
  const distance = target - start;
  const duration = 1000;
  let startTime = null;
  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const animate = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
};

const Navbar = ({ onBookNow }) => {
  const { user, openAuthModal, logout, isAuthenticated } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [profileOpen, setProfileOpen] = useState(false);

  const handleBookNow = () => {
    if (isAuthenticated) {
      onBookNow();
    } else {
      openAuthModal("login");
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const ids = [...new Set(links.map((l) => l.id))];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActive(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    slowScrollTo(id);
    setIsOpen(false);
  };

  const textColor = (id) =>
    scrolled
      ? active === id
        ? "#2563eb"
        : "#374151"
      : active === id
        ? "#ffffff"
        : "rgba(255,255,255,0.82)";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        boxShadow: scrolled ? "0 2px 30px rgba(0,0,0,0.1)" : "none",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background-color 0.35s, box-shadow 0.35s",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "80px",
          }}
        >
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            onClick={() => handleNav("home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
            }}
          >
            <Plane
              style={{
                width: "30px",
                height: "30px",
                color: scrolled ? "#2563eb" : "#ffffff",
              }}
            />
            <span
              style={{
                fontSize: "1.55rem",
                fontWeight: "800",
                color: scrolled ? "#111827" : "#ffffff",
                letterSpacing: "-0.5px",
              }}
            >
              WanderLux
            </span>
          </motion.div>

          {/* Desktop Links */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}
            className="nav-desktop"
          >
            {links.map((link) => (
              <motion.button
                key={link.label}
                onClick={() => handleNav(link.id)}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: active === link.id ? "700" : "500",
                  color: textColor(link.id),
                  padding: "4px 0",
                  position: "relative",
                  transition: "color 0.25s",
                }}
              >
                {link.label}
                {/* Sliding underline for active link */}
                {active === link.id && (
                  <motion.div
                    layoutId="nav-underline"
                    style={{
                      position: "absolute",
                      bottom: "-4px",
                      left: 0,
                      right: 0,
                      height: "2px",
                      borderRadius: "2px",
                      background: scrolled ? "#2563eb" : "#ffffff",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}

            {isAuthenticated ? (
              <div style={{ position: "relative" }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setProfileOpen(!profileOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "6px 14px 6px 6px",
                    background: scrolled ? "#f1f5f9" : "rgba(255,255,255,0.15)",
                    border: "none",
                    borderRadius: "50px",
                    cursor: "pointer",
                    color: scrolled ? "#111827" : "#ffffff",
                    fontSize: "0.9rem",
                    fontWeight: "600",
                    backdropFilter: scrolled ? "none" : "blur(4px)",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontSize: "0.85rem",
                      fontWeight: "700",
                    }}
                  >
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <span>{user?.name?.split(" ")[0]}</span>
                  <ChevronDown
                    style={{
                      width: "16px",
                      height: "16px",
                      transition: "transform 0.2s",
                      transform: profileOpen ? "rotate(180deg)" : "none",
                    }}
                  />
                </motion.button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      style={{
                        position: "absolute",
                        right: 0,
                        top: "calc(100% + 10px)",
                        width: "200px",
                        background: "#ffffff",
                        borderRadius: "16px",
                        boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                        border: "1px solid #f1f5f9",
                        overflow: "hidden",
                        zIndex: 100,
                      }}
                    >
                      <div
                        style={{
                          padding: "14px 16px",
                          borderBottom: "1px solid #f1f5f9",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: "700",
                            color: "#111827",
                          }}
                        >
                          {user?.name}
                        </p>
                        <p
                          style={{
                            fontSize: "0.75rem",
                            color: "#6b7280",
                            marginTop: "2px",
                          }}
                        >
                          {user?.email}
                        </p>
                      </div>
                      {user?.role === "admin" && (
                        <a
                          href="/admin"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            padding: "12px 16px",
                            fontSize: "0.875rem",
                            color: "#374151",
                            textDecoration: "none",
                            transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#f8fafc")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "transparent")
                          }
                        >
                          <User style={{ width: "16px", height: "16px" }} />
                          Dashboard
                        </a>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setProfileOpen(false);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          width: "100%",
                          padding: "12px 16px",
                          fontSize: "0.875rem",
                          color: "#dc2626",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#fef2f2")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                      >
                        <LogOut style={{ width: "16px", height: "16px" }} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
               
              </div>
            )}
          </div>

          {/* Book Now */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 25px rgba(37,99,235,0.45)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBookNow}
            className="nav-desktop"
            style={{
              padding: "0.7rem 1.75rem",
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "#ffffff",
              border: "none",
              borderRadius: "50px",
              fontSize: "0.975rem",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(37,99,235,0.3)",
            }}
          >
            Book Now
          </motion.button>

           {!isAuthenticated && (
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 8px 25px rgba(37,99,235,0.45)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openAuthModal("login")}
                    className="nav-desktop"
                    style={{
                      padding: "0.7rem 1.75rem",
                      background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "50px",
                      fontSize: "0.975rem",
                      fontWeight: "700",
                      cursor: "pointer",
                      boxShadow: "0 4px 15px rgba(37,99,235,0.3)",
                    }}
                  >
                    Login
                  </motion.button>
                )}

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="nav-mobile"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
            }}
          >
            {isOpen ? (
              <X
                style={{
                  width: "26px",
                  height: "26px",
                  color: scrolled ? "#111827" : "#ffffff",
                }}
              />
            ) : (
              <Menu
                style={{
                  width: "26px",
                  height: "26px",
                  color: scrolled ? "#111827" : "#ffffff",
                }}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              backgroundColor: "#ffffff",
              borderTop: "1px solid #f1f5f9",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "1.25rem 2rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}
            >
              {links.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNav(link.id)}
                  style={{
                    background: active === link.id ? "#eff6ff" : "none",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    padding: "0.75rem 1rem",
                    textAlign: "left",
                    fontSize: "1rem",
                    fontWeight: active === link.id ? "700" : "500",
                    color: active === link.id ? "#2563eb" : "#374151",
                  }}
                >
                  {link.label}
                </motion.button>
              ))}

              <div
                style={{
                  borderTop: "1px solid #f1f5f9",
                  marginTop: "0.5rem",
                  paddingTop: "0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {isAuthenticated ? (
                  <>
                    <div
                      style={{
                        padding: "0.5rem 1rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #2563eb, #1d4ed8)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          fontWeight: "700",
                          fontSize: "0.9rem",
                        }}
                      >
                        {user?.name?.charAt(0)?.toUpperCase()}
                      </div>
                      <div>
                        <p
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: "700",
                            color: "#111827",
                          }}
                        >
                          {user?.name}
                        </p>
                        <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    {user?.role === "admin" && (
                      <a
                        href="/admin"
                        style={{
                          padding: "0.75rem 1rem",
                          borderRadius: "10px",
                          textDecoration: "none",
                          fontSize: "0.95rem",
                          fontWeight: "600",
                          color: "#374151",
                          background: "#f8fafc",
                        }}
                      >
                        Admin Dashboard
                      </a>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      style={{
                        padding: "0.75rem 1rem",
                        borderRadius: "10px",
                        background: "#fef2f2",
                        color: "#dc2626",
                        border: "none",
                        fontSize: "0.95rem",
                        fontWeight: "600",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    {!isAuthenticated && (
                      <button
                        onClick={() => {
                          openAuthModal("login");
                          setIsOpen(false);
                        }}
                        style={{
                          marginTop: "0.75rem",
                          padding: "0.875rem",
                          background:
                            "linear-gradient(135deg, #2563eb, #1d4ed8)",
                          color: "#fff",
                          border: "none",
                          borderRadius: "12px",
                          fontSize: "1rem",
                          fontWeight: "700",
                          cursor: "pointer",
                        }}
                      >
                        Login
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile  { display: none !important; }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
