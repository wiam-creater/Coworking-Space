import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/accueil");
    } catch (err) {
      setError(err.response?.data?.message || "Email ou mot de passe incorrect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "linear-gradient(135deg, #1B2A4A 0%, #243656 60%, #F8F4EE 100%)" }}>

      <div className="card-dw p-4 p-md-5" style={{ width: "100%", maxWidth: "420px" }}>

        {/* Logo */}
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center rounded-circle mb-3"
            style={{ width: 64, height: 64, background: "#1B2A4A" }}>
            <span style={{ color: "#C8A97E", fontWeight: 700, fontSize: 20 }}>DW</span>
          </div>
          <h4 className="fw-bold" style={{ color: "#1B2A4A" }}>Dar Work</h4>
          <p className="text-muted small">Connectez-vous à votre espace</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-500 small">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="exemple@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderRadius: 8, padding: "10px 14px" }}
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-500 small">Mot de passe</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ borderRadius: 8, padding: "10px 14px" }}
            />
          </div>
          <button type="submit" className="btn btn-navy w-100 py-2 fw-500"
            style={{ borderRadius: 8 }} disabled={loading}>
            {loading ? (
              <><span className="spinner-border spinner-border-sm me-2"/>Connexion...</>
            ) : "Se connecter"}
          </button>
        </form>

        <p className="text-center mt-3 small text-muted">
          Pas de compte ?{" "}
          <span className="fw-bold" style={{ color: "#1B2A4A", cursor: "pointer" }}
            onClick={() => navigate("/inscription")}>
            S'inscrire
          </span>
        </p>
      </div>
    </div>
  );
}