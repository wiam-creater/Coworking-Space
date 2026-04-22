import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token    = localStorage.getItem("token");
  const user     = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  const isActive = (path) =>
    location.pathname === path ? "nav-link-custom active" : "nav-link-custom";

  return (
    <nav className="navbar-cowork">
      <div className="container">
        <div className="navbar-inner">

          {/* ── Logo ── */}
          
          <p style={{ fontFamily: "'Playfair Display', serif",marginTop: "20px",
marginRight: "100px", fontSize: "2.4rem", fontWeight: "700", color: "var(--vanilla) !important" }}> DW</p> 
          

          {/* ── Links ── */}
          <div className="navbar-links">

            <Link to="/accueil" className={isActive("/accueil")}>
              <i className="bi bi-house"></i>Accueil
            </Link>

            <Link to="/espaces" className={isActive("/espaces")}>
              <i className="bi bi-grid"></i>Espaces
            </Link>

            {/* Membre */}
            {token && user?.role === "member" && (
              <>
                <Link to="/reserve" className={isActive("/reserve")}>
                  <i className="bi bi-calendar-plus"></i>Réserver
                </Link>
                <Link to="/mes-reservations" className={isActive("/mes-reservations")}>
                  <i className="bi bi-calendar-check"></i>Mes réservations
                </Link>
                <Link to="/abonnement" className={isActive("/abonnement")}>
                  <i className="bi bi-credit-card"></i>Abonnement
                </Link>
              </>
            )}

            {/* Admin */}
            {token && user?.role === "admin" && (
              <>
                <Link to="/dashboard" className={isActive("/dashboard")}>
                  <i className="bi bi-speedometer2"></i>Dashboard
                </Link>
                <Link to="/admin/reservations" className={isActive("/admin/reservations")}>
                  <i className="bi bi-table"></i>Réservations
                </Link>
              </>
            )}

            {/* Non connecté */}
            {!token && (
              <>
                <Link to="/login" className={isActive("/login")}>
                  <i className="bi bi-person"></i>Connexion
                </Link>
                <Link to="/register" className="btn-accent ms-2"
                  style={{ textDecoration: "none" }}>
                  <i className="bi bi-person-plus"></i>S'inscrire
                </Link>
              </>
            )}

            {/* Connecté → nom + logout */}
            {token && (
              <div className="navbar-user">
                <span className="navbar-username">
                  <i className="bi bi-person-circle"></i>
                  {user?.name?.split(" ")[0]}
                </span>
                <button onClick={handleLogout} className="btn-outline-accent"
                  style={{ padding: "6px 14px", fontSize: "0.82rem" }}>
                  <i className="bi bi-box-arrow-right"></i>
                  Déconnexion
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
}