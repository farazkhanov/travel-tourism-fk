import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  CreditCard,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Loader2,
} from "lucide-react";
import { api } from "../services/api";
import PaymentMethods from "./PaymentMethods";

const destinations = [
  "Hunza Valley",
  "Skardu & Deosai",
  "Swat Valley",
  "Fairy Meadows",
  "Naran & Kaghan",
  "Lahore",
  "Murree",
  "Chitral",
  "Gilgit",
  "Azad Kashmir",
];

const packages = [
  {
    id: "basic",
    name: "Basic Package",
    desc: "3 days / 2 nights, Hotel + Transport",
    price: 55000,
  },
  {
    id: "standard",
    name: "Standard Package",
    desc: "5 days / 4 nights, Hotel + Transport + Guide",
    price: 97000,
  },
  {
    id: "premium",
    name: "Premium Package",
    desc: "7 days / 6 nights, Luxury Hotel + All Inclusive",
    price: 167000,
  },
  {
    id: "custom",
    name: "Custom Package",
    desc: "Tailored itinerary as per your needs",
    price: null,
  },
];

const STEPS = ["Personal Info", "Trip Details", "Package", "Payment"];

const empty = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  cnic: "",
  destination: "",
  departureCity: "",
  travelDate: "",
  returnDate: "",
  adults: "1",
  children: "0",
  specialRequests: "",
  package: "",
  paymentMethod: "bank",
};

export default function BookingModal({
  isOpen,
  onClose,
  preselectedDestination,
}) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    ...empty,
    destination: preselectedDestination || "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const err = (k, msg) => setErrors((e) => ({ ...e, [k]: msg }));
  const clearErr = (k) =>
    setErrors((e) => {
      const n = { ...e };
      delete n[k];
      return n;
    });

  const validate = () => {
    let ok = true;
    const required =
      step === 0
        ? ["firstName", "lastName", "email", "phone"]
        : step === 1
          ? ["destination", "departureCity", "travelDate", "returnDate"]
          : step === 2
            ? ["package"]
            : [];
    required.forEach((k) => {
      if (!form[k]) {
        err(k, "This field is required");
        ok = false;
      }
    });
    if (step === 0 && form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      err("email", "Enter a valid email");
      ok = false;
    }
    return ok;
  };

  const next = () => {
    if (validate()) {
      if (step === 2) {
        // After package selection, show payment
        setShowPayment(true);
      } else {
        setStep((s) => s + 1);
      }
    }
  };
  const back = () => {
    if (showPayment) {
      setShowPayment(false);
    } else {
      setStep((s) => s - 1);
    }
  };

  const handlePaymentSuccess = (paymentData) => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setStep(0);
      setForm({ ...empty });
      setShowPayment(false);
      onClose();
    }, 4000);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setApiError("");
    try {
      await api.createBooking(form);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setStep(0);
        setForm({ ...empty });
        onClose();
      }, 4000);
    } catch (err) {
      setApiError(err.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectedPkg = packages.find((p) => p.id === form.package);
  const totalPrice = selectedPkg?.price
    ? selectedPkg.price * parseInt(form.adults || 1)
    : null;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
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
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            width: "100%",
            maxWidth: "680px",
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
              background: "linear-gradient(135deg, #1e3a5f, #2563eb)",
              padding: "1.75rem 2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
            }}
          >
            <div>
              <h2
                style={{
                  color: "#ffffff",
                  fontSize: "1.4rem",
                  fontWeight: "800",
                  margin: 0,
                }}
              >
                Book Your Trip
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.875rem",
                  margin: "4px 0 0",
                }}
              >
                Step {step + 1} of {STEPS.length} — {STEPS[step]}
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <X style={{ width: "20px", height: "20px", color: "#ffffff" }} />
            </button>
          </div>

          {/* Progress Bar */}
          <div
            style={{ display: "flex", background: "#f1f5f9", flexShrink: 0 }}
          >
            {STEPS.map((s, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  padding: "0.75rem 0.5rem",
                  textAlign: "center",
                  fontSize: "0.78rem",
                  fontWeight: i <= step ? "700" : "500",
                  color: i <= step ? "#2563eb" : "#94a3b8",
                  borderBottom: `3px solid ${i <= step ? "#2563eb" : "transparent"}`,
                  transition: "all 0.3s",
                }}
              >
                {s}
              </div>
            ))}
          </div>

          {/* Body */}
          <div style={{ overflowY: "auto", padding: "2rem", flex: 1 }}>
            {submitted ? (
              <SuccessScreen name={form.firstName} />
            ) : showPayment ? (
              <PaymentMethods 
                bookingData={{
                  firstName: form.firstName,
                  lastName: form.lastName,
                  email: form.email,
                  phone: form.phone,
                  cnic: form.cnic,
                  destination: form.destination,
                  departureCity: form.departureCity,
                  travelDate: form.travelDate,
                  returnDate: form.returnDate,
                  adults: parseInt(form.adults),
                  children: parseInt(form.children),
                  specialRequests: form.specialRequests,
                  package: form.package
                }}
                totalAmount={totalPrice}
                onSuccess={handlePaymentSuccess}
                onCancel={() => setShowPayment(false)}
              />
            ) : (
              <>
                {step === 0 && (
                  <StepPersonal
                    form={form}
                    set={set}
                    errors={errors}
                    clearErr={clearErr}
                  />
                )}
                {step === 1 && (
                  <StepTrip
                    form={form}
                    set={set}
                    errors={errors}
                    clearErr={clearErr}
                  />
                )}
                {step === 2 && (
                  <StepPackage
                    form={form}
                    set={set}
                    errors={errors}
                    clearErr={clearErr}
                  />
                )}
              </>
            )}
          </div>

          {/* Footer Buttons */}
          {!submitted && !showPayment && (
            <div
              style={{
                padding: "1.25rem 2rem",
                borderTop: "1px solid #f1f5f9",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexShrink: 0,
                background: "#fafafa",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {apiError && (
                <p
                  style={{
                    color: "#ef4444",
                    fontSize: "0.875rem",
                    textAlign: "center",
                    width: "100%",
                  }}
                >
                  {apiError}
                </p>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <button
                  onClick={back}
                  disabled={step === 0}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "0.75rem 1.5rem",
                    background: step === 0 ? "#f1f5f9" : "#ffffff",
                    color: step === 0 ? "#94a3b8" : "#374151",
                    border: "1px solid #e2e8f0",
                    borderRadius: "12px",
                    fontSize: "0.95rem",
                    fontWeight: "600",
                    cursor: step === 0 ? "not-allowed" : "pointer",
                  }}
                >
                  <ChevronLeft style={{ width: "18px", height: "18px" }} /> Back
                </button>
                {step < 2 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={next}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "0.75rem 2rem",
                      background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      fontWeight: "700",
                      cursor: "pointer",
                      boxShadow: "0 4px 15px rgba(37,99,235,0.35)",
                    }}
                  >
                    Next{" "}
                    <ChevronRight style={{ width: "18px", height: "18px" }} />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={next}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "0.75rem 2rem",
                      background: "linear-gradient(135deg, #059669, #047857)",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "12px",
                      fontSize: "0.95rem",
                      fontWeight: "700",
                      cursor: "pointer",
                      boxShadow: "0 4px 15px rgba(5,150,105,0.35)",
                    }}
                  >
                    Proceed to Payment{" "}
                    <ChevronRight style={{ width: "18px", height: "18px" }} />
                  </motion.button>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Step 1: Personal Info ───────────────────────────────────────────────────
function StepPersonal({ form, set, errors, clearErr }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <SectionTitle icon={User} title="Personal Information" />
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <Field label="First Name *" error={errors.firstName}>
          <input
            value={form.firstName}
            onChange={(e) => {
              set("firstName", e.target.value);
              clearErr("firstName");
            }}
            placeholder="e.g. Faraz"
            style={inputStyle(errors.firstName)}
          />
        </Field>
        <Field label="Last Name *" error={errors.lastName}>
          <input
            value={form.lastName}
            onChange={(e) => {
              set("lastName", e.target.value);
              clearErr("lastName");
            }}
            placeholder="e.g. Khan"
            style={inputStyle(errors.lastName)}
          />
        </Field>
      </div>
      <Field label="Email Address *" error={errors.email}>
        <input
          type="email"
          value={form.email}
          onChange={(e) => {
            set("email", e.target.value);
            clearErr("email");
          }}
          placeholder="you@example.com"
          style={inputStyle(errors.email)}
        />
      </Field>
      <Field label="Phone Number *" error={errors.phone}>
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => {
            set("phone", e.target.value);
            clearErr("phone");
          }}
          placeholder="+92 300 1234567"
          style={inputStyle(errors.phone)}
        />
      </Field>
      <Field label="CNIC / Passport Number">
        <input
          value={form.cnic}
          onChange={(e) => set("cnic", e.target.value)}
          placeholder="42101-1234567-1"
          style={inputStyle()}
        />
      </Field>
    </div>
  );
}

// ─── Step 2: Trip Details ─────────────────────────────────────────────────────
function StepTrip({ form, set, errors, clearErr }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <SectionTitle icon={MapPin} title="Trip Details" />
      <Field label="Destination *" error={errors.destination}>
        <select
          value={form.destination}
          onChange={(e) => {
            set("destination", e.target.value);
            clearErr("destination");
          }}
          style={inputStyle(errors.destination)}
        >
          <option value="">Select a destination</option>
          {destinations.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Departure City *" error={errors.departureCity}>
        <select
          value={form.departureCity}
          onChange={(e) => {
            set("departureCity", e.target.value);
            clearErr("departureCity");
          }}
          style={inputStyle(errors.departureCity)}
        >
          <option value="">Select departure city</option>
          {[
            "Karachi",
            "Lahore",
            "Islamabad",
            "Peshawar",
            "Quetta",
            "Multan",
            "Faisalabad",
          ].map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </Field>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <Field label="Travel Date *" error={errors.travelDate}>
          <input
            type="date"
            value={form.travelDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              set("travelDate", e.target.value);
              clearErr("travelDate");
            }}
            style={inputStyle(errors.travelDate)}
          />
        </Field>
        <Field label="Return Date *" error={errors.returnDate}>
          <input
            type="date"
            value={form.returnDate}
            min={form.travelDate || new Date().toISOString().split("T")[0]}
            onChange={(e) => {
              set("returnDate", e.target.value);
              clearErr("returnDate");
            }}
            style={inputStyle(errors.returnDate)}
          />
        </Field>
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <Field label="Adults">
          <select
            value={form.adults}
            onChange={(e) => set("adults", e.target.value)}
            style={inputStyle()}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>
                {n} Adult{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Children (under 12)">
          <select
            value={form.children}
            onChange={(e) => set("children", e.target.value)}
            style={inputStyle()}
          >
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} Child{n !== 1 ? "ren" : ""}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Special Requests / Notes">
        <textarea
          value={form.specialRequests}
          onChange={(e) => set("specialRequests", e.target.value)}
          placeholder="Any dietary requirements, accessibility needs, or special requests..."
          rows={3}
          style={{ ...inputStyle(), resize: "vertical" }}
        />
      </Field>
    </div>
  );
}

// ─── Step 3: Package Selection ────────────────────────────────────────────────
function StepPackage({ form, set, errors, clearErr }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <SectionTitle icon={CreditCard} title="Choose Your Package" />
      {errors.package && (
        <p style={{ color: "#ef4444", fontSize: "0.875rem" }}>
          {errors.package}
        </p>
      )}
      <div
        style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}
      >
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => {
              set("package", pkg.id);
              clearErr("package");
            }}
            style={{
              padding: "1.25rem 1.5rem",
              borderRadius: "14px",
              border: `2px solid ${form.package === pkg.id ? "#2563eb" : "#e2e8f0"}`,
              background: form.package === pkg.id ? "#eff6ff" : "#ffffff",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  border: `2px solid ${form.package === pkg.id ? "#2563eb" : "#cbd5e1"}`,
                  background:
                    form.package === pkg.id ? "#2563eb" : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                {form.package === pkg.id && (
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#ffffff",
                    }}
                  />
                )}
              </div>
              <div>
                <div
                  style={{
                    fontWeight: "700",
                    color: "#0f172a",
                    fontSize: "1rem",
                  }}
                >
                  {pkg.name}
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#64748b",
                    marginTop: "2px",
                  }}
                >
                  {pkg.desc}
                </div>
              </div>
            </div>
            <div
              style={{
                fontWeight: "800",
                fontSize: "1.2rem",
                color: pkg.price ? "#059669" : "#64748b",
                flexShrink: 0,
                marginLeft: "1rem",
              }}
            >
              {pkg.price
                ? `PKR ${pkg.price.toLocaleString()}/person`
                : "Custom"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Step 4: Confirm (Now removed, using PaymentMethods component) ───────────

// ─── Success Screen ───────────────────────────────────────────────────────────
function SuccessScreen({ name }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{ textAlign: "center", padding: "2rem 1rem" }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        style={{
          width: "80px",
          height: "80px",
          background: "linear-gradient(135deg, #059669, #047857)",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.5rem",
        }}
      >
        <CheckCircle
          style={{ width: "44px", height: "44px", color: "#ffffff" }}
        />
      </motion.div>
      <h3
        style={{
          fontSize: "1.75rem",
          fontWeight: "900",
          color: "#0f172a",
          marginBottom: "0.75rem",
        }}
      >
        Booking Confirmed!
      </h3>
      <p
        style={{
          fontSize: "1.05rem",
          color: "#64748b",
          lineHeight: 1.7,
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        Thank you, <strong>{name}</strong>! Your booking request has been
        received. Our team will contact you within 24 hours to confirm your trip
        details.
      </p>
      <div
        style={{
          marginTop: "1.5rem",
          padding: "1rem",
          background: "#f0fdf4",
          borderRadius: "12px",
          border: "1px solid #bbf7d0",
        }}
      >
        <p style={{ fontSize: "0.9rem", color: "#166534", fontWeight: "600" }}>
          📧 A confirmation email has been sent to your inbox.
        </p>
      </div>
    </motion.div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function SectionTitle({ icon: Icon, title }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        marginBottom: "0.25rem",
      }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          background: "#eff6ff",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon style={{ width: "16px", height: "16px", color: "#2563eb" }} />
      </div>
      <h3
        style={{
          fontSize: "1rem",
          fontWeight: "700",
          color: "#0f172a",
          margin: 0,
        }}
      >
        {title}
      </h3>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label
        style={{ fontSize: "0.875rem", fontWeight: "600", color: "#374151" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <span style={{ fontSize: "0.8rem", color: "#ef4444" }}>{error}</span>
      )}
    </div>
  );
}

const inputStyle = (error) => ({
  width: "100%",
  padding: "0.75rem 1rem",
  border: `1.5px solid ${error ? "#ef4444" : "#e2e8f0"}`,
  borderRadius: "10px",
  fontSize: "0.95rem",
  color: "#0f172a",
  background: "#ffffff",
  outline: "none",
  transition: "border-color 0.2s",
  fontFamily: "inherit",
});
