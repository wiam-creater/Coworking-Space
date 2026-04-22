import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/NavbarPublic";
import api from "../api/axios";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    password: "", password_confirmation: ""
  });
  const [loading, setLoading] = useState(false);
  const [erreur,  setErreur]  = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErreur("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.password_confirmation) {
      setErreur("Les mots de passe ne correspondent pas.");
      return;
    }
    if (form.password.length < 6) {
      setErreur("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post("/register", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user",  JSON.stringify(data.user));
      setSuccess(true);
      setTimeout(() => navigate("/accueil"), 1500);
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        const first = Object.values(errors)[0];
        setErreur(Array.isArray(first) ? first[0] : first);
      } else {
        setErreur(err.response?.data?.message || "Erreur lors de l'inscription.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div style={{
        minHeight: "calc(100vh - 73px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px 16px",
        background: `radial-gradient(ellipse at top, rgba(201,168,76,0.06) 0%, transparent 60%), var(--dark)`
      }}>
        <div style={{ width: "100%", maxWidth: "480px" }}>

          {/* Header */}
          <div className="text-center mb-4">
            <div style={{
              width: "64px", height: "64px", borderRadius: "16px",
              background: "rgba(201,168,76,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px"
            }}>
              <i className="bi bi-person-plus" style={{ color: "var(--gold)", fontSize: "1.8rem" }}></i>
            </div>
            <h2 style={{ fontWeight: "700", fontSize: "1.8rem", marginBottom: "8px" }}>
              Créer un compte
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Rejoignez la communauté DeskWave
            </p>
          </div>

          {/* Card */}
          <div className="card-dark p-4">

            {/* Succès */}
            {success && (
              <div className="d-flex align-items-center gap-2 mb-3" style={{
                background: "rgba(25,135,84,0.1)",
                border: "1px solid rgba(25,135,84,0.3)",
                borderRadius: "10px", padding: "12px 16px"
              }}>
                <i className="bi bi-check-circle" style={{ color: "#20C997" }}></i>
                <span style={{ color: "#20C997", fontSize: "0.88rem" }}>
                  Compte créé avec succès ! Redirection...
                </span>
              </div>
            )}

            {/* Erreur */}
            {erreur && (
              <div className="d-flex align-items-center gap-2 mb-3" style={{
                background: "rgba(220,53,69,0.1)",
                border: "1px solid rgba(220,53,69,0.3)",
                borderRadius: "10px", padding: "12px 16px"
              }}>
                <i className="bi bi-exclamation-circle" style={{ color: "#FF6B6B" }}></i>
                <span style={{ color: "#FF6B6B", fontSize: "0.88rem" }}>{erreur}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* Nom */}
              <div className="mb-3">
                <label className="label-dark">
                  <i className="bi bi-person me-1"></i>Nom complet
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-dark"
                  placeholder="Votre nom complet"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="label-dark">
                  <i className="bi bi-envelope me-1"></i>Adresse email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-dark"
                  placeholder="vous@exemple.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Téléphone */}
              <div className="mb-3">
                <label className="label-dark">
                  <i className="bi bi-telephone me-1"></i>Téléphone
                  <span style={{ color: "var(--text-muted)", marginLeft: "4px" }}>(optionnel)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="form-dark"
                  placeholder="+212 6 00 00 00 00"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="label-dark">
                  <i className="bi bi-lock me-1"></i>Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-dark"
                  placeholder="Minimum 6 caractères"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="label-dark">
                  <i className="bi bi-lock-fill me-1"></i>Confirmer le mot de passe
                </label>
                <input
                  type="password"
                  name="password_confirmation"
                  className="form-dark"
                  placeholder="Répétez le mot de passe"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-gold w-100 d-flex align-items-center justify-content-center gap-2"
                style={{ padding: "13px", fontSize: "0.95rem", borderRadius: "12px" }}
                disabled={loading || success}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm"></span>
                    Inscription...
                  </>
                ) : (
                  <>
                    <i className="bi bi-person-check"></i>
                    Créer mon compte
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Footer */}
          <p className="text-center mt-4" style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
            Déjà un compte ?{" "}
            <Link to="/login" style={{ color: "var(--gold)", textDecoration: "none", fontWeight: "600" }}>
              Se connecter
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}