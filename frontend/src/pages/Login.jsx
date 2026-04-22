import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/NavbarPublic";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur]   = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErreur("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErreur("");
    try {
      const { data } = await api.post("/login", form);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user",  JSON.stringify(data.user));

      if (data.user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/accueil");
      }
    } catch (err) {
      setErreur(err.response?.data?.message || "Email ou mot de passe incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div style={{
        minHeight: "calc(100vh - 73px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 16px",
        background: `radial-gradient(ellipse at top, rgba(201,168,76,0.06) 0%, transparent 60%),
                     var(--dark)`
      }}>
        <div style={{ width: "100%", maxWidth: "440px" }}>

          {/* Header */}
          <div className="text-center mb-4">
           
            <h2 style={{ fontWeight: "700", fontSize: "1.8rem", marginBottom: "15px" ,textAlign: "center",color: "#c1ab85",fontWeight: "bold",}}>
              Login
            </h2>
            
          </div>

          {/* Card */}
          <div className="card-dark p-4">

            {/* Erreur */}
            {erreur && (
              <div className="d-flex align-items-center gap-2 mb-3" style={{
                background: "rgb(189, 43, 18)",
                border: "1px solid rgba(220,53,69,0.3)",
                borderRadius: "10px", padding: "12px 16px"
              }}>
                <i className="bi bi-exclamation-circle" style={{ color: "#FF6B6B" }}></i>
                <span style={{ color: "#FF6B6B", fontSize: "0.88rem" }}>{erreur}</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="mb-3">
                <label className="label-dark">
                  <i className="bi bi-envelope me-1"></i>Email
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

              {/* Password */}
              <div className="mb-4">
                <label className="label-dark">
                  <i className="bi bi-lock me-1"></i>Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-dark"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-gold w-100 d-flex align-items-center justify-content-center gap-2"
                style={{ padding: "13px", fontSize: "10px", borderRadius: "12px", marginTop: "15px" ,textAlign: "center"}}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm"></span>
                    Connexion...
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right" ></i>
                    Se connecter
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Footer */}
          <p className="text-center mt-4" style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
           
            <Link to="/register" style={{ color: "var(--gold)", textDecoration: "none", fontWeight: "600" }}>
              S'inscrire 
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}