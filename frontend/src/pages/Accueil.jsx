import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/NavbarPublic";

export default function Accueil() {
  const navigate = useNavigate();
  const token    = localStorage.getItem("token");
  const user     = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <section
        style={{
          minHeight: "100vh",
          background: `linear-gradient(135deg, rgba(37, 47, 63, 0.97) 0%, rgba(38, 48, 67, 0.95) 50%, rgba(76, 97, 151, 0.97) 100%),
                       url('/bg.jpeg') center/cover no-repeat`,
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Cercles décoratifs */}
        
        <div style={{
          position: "absolute", bottom: "-150px", left: "-100px",
          width: "600px", height: "600px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(53, 62, 91, 0.97) 0%, transparent 70%)",
          pointerEvents: "none"
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="row align-items-center">
            <div className="col-lg-7">

              

              <h1 style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: "700",
                lineHeight: "1.15",
                marginBottom: "24px",
                color:"#c1ab85"
              }}>
                Dar Work Travaillez chez {" "}
                <span className="gold-gradient">Chez Nos</span>
              </h1>

              <p style={{
                     fontSize: "1.1rem",
                       color: "#eae2d5",
                       lineHeight: "1.8",
                       marginBottom: "40px",
                       maxWidth: "520px",
                       fontfamily: "'Poppins', sans-serif",
                       textAlign: "justify", 
                       letterSpacing: "0.5px",
                       letterSpacing: "1px",
                       fontWeight: "300", 
  
                       fontWeight: "400" 
}}>
                Bureaux modernes, salles de réunion équipées et zones de travail
                inspirantes. Rejoignez notre communauté de professionnels et donnez
                une nouvelle dimension à votre productivité.
              </p>

              <div className="d-flex gap-3 flex-wrap">
                {!token ? (
                  <>
                    <Link to="/register" className="btn-gold d-inline-flex align-items-center gap-2"
                      style={{ padding: "14px 90px", fontSize: "1rem", borderRadius: "12px", textDecoration: "none" }}>
                      <i className="bi bi-rocket-takeoff"></i>
                      Commencer maintenant
                    </Link>
                    <Link to="/espaces" className="btn-outline-gold d-inline-flex align-items-center gap-2"
                      style={{ padding: "14px 90px", fontSize: "1rem", borderRadius: "12px", textDecoration: "none" }}>
                      <i className="bi bi-eye"></i>
                      Voir les espaces
                    </Link>
                  </>
                ) : (
                  <>
                    {user?.role === "member" && (
                      <Link to="/reserve" className="btn-gold d-inline-flex align-items-center gap-2"
                        style={{ padding: "14px 32px", fontSize: "1rem", borderRadius: "12px", textDecoration: "none" }}>
                        <i className="bi bi-calendar-plus"></i>
                        Réserver un espace
                      </Link>
                    )}
                    {user?.role === "admin" && (
                      <Link to="/dashboard" className="btn-gold d-inline-flex align-items-center gap-2"
                        style={{ padding: "14px 32px", fontSize: "1rem", borderRadius: "12px", textDecoration: "none" }}>
                        <i className="bi bi-speedometer2"></i>
                        Tableau de bord
                      </Link>
                    )}
                    <Link to="/espaces" className="btn-outline-gold d-inline-flex align-items-center gap-2"
                      style={{ padding: "14px 32px", fontSize: "1rem", borderRadius: "12px", textDecoration: "none" }}>
                      <i className="bi bi-grid"></i>
                      Nos espaces
                    </Link>
                  </>
                )}
              </div>

              

            </div>

            {/* Card flottante droite */}
            <div className="col-lg-5 d-none d-lg-block">
              <div className="card-dark p-4" style={{ borderRadius: "24px" }}>
                <div className="d-flex align-items-center gap-3 mb-4">
                  
                  <div>
                    <div style={{ fontWeight: "600", fontSize: "1.95rem" ,color:"#c1ab85" }}></div>Nos avantages
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Coworking Space</div>
                  </div>
                </div>

                {[
                  { icon: "bi-wifi",           label: "Internet fibre optique 1Gbps" },
                  { icon: "bi-cup-hot",         label: "Café " },
                
                  { icon: "bi-shield-check",    label: "Accès sécurisé 24h/7j" },
                 
                ].map((item, i) => (
                  <div key={i} className="d-flex align-items-center gap-3 mb-3">
                    <div style={{
                      width: "36px", height: "36px", borderRadius: "10px",
                      background: "rgba(201,168,76,0.1)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0
                    }}>
                      <i className={`bi ${item.icon}`} style={{ color: "var(--gold)", fontSize: "0.95rem" }}></i>
                    </div>
                    <span style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SERVICES SECTION
      ══════════════════════════════════════ */}
      <section className="section-pad" style={{ background: "var(--dark-2)" }}>
        <div className="container">
          <div className="text-center mb-5">
            <p style={{ color: "va#c1ab85n)", fontSize: "1.85rem", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "600" }}>
              Nos services
            </p>
            <h2 style={{ fontSize: "2.2rem", fontWeight: "700", margin: "12px 0 8px" }}>
              Tout ce dont vous avez besoin
            </h2>
            <div className="divider-gold mx-auto"></div>
          </div>

          <div className="row g-4">
            {[
              {
                icon: "bi-laptop",
                title: "Bureau Moderne",
                desc: "Postes de travail ergonomiques avec double écran, lumière naturelle et ambiance productive.",
                price: "À partir de 50 DH/h"
              },
              {
                icon: "bi-people",
                title: "Salle de Réunion",
                desc: "Salles équipées pour vos meetings, présentations et formations avec matériel AV complet.",
                price: "À partir de 80 DH/h"
              },
              {
                icon: "bi-lock",
                title: "Bureau Privé",
                desc: "Espaces fermés et sécurisés pour les équipes qui ont besoin de confidentialité totale.",
                price: "À partir de 100 DH/h"
              },
              {
                icon: "bi-book",
                title: "Zone Étude",
                desc: "Environnement calme et propice à la concentration pour vos études et recherches.",
                price: "À partir de 30 DH/h"
              },
            ].map((s, i) => (
              <div key={i} className="col-md-6 col-lg-3">
                <div className="card-dark p-4 h-100 text-center">
                  <div style={{
                    width: "64px", height: "64px", borderRadius: "16px",
                    background: "rgba(201,168,76,0.1)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px"
                  }}>
                    <i className={`bi ${s.icon}`} style={{ color: "var(--gold)", fontSize: "1.6rem" }}></i>
                  </div>
                  <h5 style={{ fontWeight: "600", marginBottom: "12px", fontSize: "1rem" }}>{s.title}</h5>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: "1.7", marginBottom: "16px" }}>
                    {s.desc}
                  </p>
                  <span style={{
                    color: "var(--gold)", fontSize: "0.82rem",
                    fontWeight: "600", letterSpacing: "0.3px"
                  }}>
                    {s.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════ */}
      <section className="section-pad" style={{ background: "var(--dark)" }}>
        <div className="container">
          <div className="card-dark p-5 text-center" style={{
            background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(13,13,13,0.9) 100%)",
            border: "1px solid var(--border)",
            borderRadius: "24px"
          }}>
            <i className="bi bi-stars" style={{ fontSize: "2.5rem", color: "var(--gold)", display: "block", marginBottom: "20px" }}></i>
            <h2 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "16px" }}>
              Prêt à rejoindre DarWork ?
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", marginBottom: "32px", maxWidth: "500px", margin: "0 auto 32px" }}>
              Inscrivez-vous gratuitement et réservez votre premier espace dès aujourd'hui.
            </p>
            <div className="d-flex gap-3 justify-content-center flex-wrap">
              {!token ? (
                <>
                  <Link to="/register"
                    className="btn-gold d-inline-flex align-items-center gap-2"
                    style={{ padding: "14px 36px", fontSize: "1rem", borderRadius: "12px", textDecoration: "none" }}>
                    <i className="bi bi-person-plus"></i>
                    Créer un compte
                  </Link>
                  <Link to="/login"
                    className="btn-outline-gold d-inline-flex align-items-center gap-2"
                    style={{ padding: "14px 36px", fontSize: "1rem", borderRadius: "12px", textDecoration: "none" }}>
                    <i className="bi bi-box-arrow-in-right"></i>
                    Se connecter
                  </Link>
                </>
              ) : (
                <Link to={user?.role === "admin" ? "/dashboard" : "/reserve"}
                  className="btn-gold d-inline-flex align-items-center gap-2"
                  style={{ padding: "14px 36px", fontSize: "1rem", borderRadius: "12px", textDecoration: "none" }}>
                  <i className="bi bi-arrow-right-circle"></i>
                  {user?.role === "admin" ? "Accéder au dashboard" : "Réserver maintenant"}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer style={{
        background: "var(--dark-2)",
        borderTop: "1px solid var(--border)",
        padding: "40px 0 24px"
      }}>
        <div className="container">
          <div className="row g-4 mb-4">
            <div className="col-md-4">
              <div className="navbar-brand-logo d-flex align-items-center gap-2 mb-3" style={{ fontSize: "1.3rem" }}>
                
               
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: "1.7" }}>
               
              </p>
            </div>
            <div className="col-md-4">
              <h6 style={{ color: "#c1ab85", fontWeight: "600", marginBottom: "16px", fontSize: "0.90rem", letterSpacing: "1px", textTransform: "uppercase" }}>
                Navigation
              </h6>
              {[
                { to: "/accueil", label: "Accueil" },
                { to: "/espaces", label: "Espaces" },
                { to: "/register", label: "S'inscrire" },
                { to: "/login", label: "Se connecter" },
              ].map((l, i) => (
                <div key={i} style={{ marginBottom: "8px" }}>
                  <Link to={l.to} style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.88rem", transition: "color 0.2s" }}
                    onMouseOver={e => e.target.style.color = "var(--gold)"}
                    onMouseOut={e => e.target.style.color = "var(--text-muted)"}>
                    {l.label}
                  </Link>
                </div>
              ))}
            </div>
            <div className="col-md-4">
              <h6 style={{ color: "#c1ab85", fontWeight: "600", marginBottom: "16px", fontSize: "0.90rem", letterSpacing: "1px", textTransform: "uppercase" }}>
                Contact
              </h6>
              {[
                { icon: "bi-geo-alt", text: "Fés, Maroc" },
                { icon: "bi-envelope", text: "darwork@gmail.com" },
                { icon: "bi-telephone", text: "+212 6 22 52 34 10" },
              ].map((c, i) => (
                <div key={i} className="d-flex align-items-center gap-2 mb-2">
                  <i className={`bi ${c.icon}`} style={{ color: "var(--gold)", fontSize: "0.9rem" }}></i>
                  <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{c.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px", textAlign: "center" }}>
            <span style={{ color: "#c1ab85", fontSize: "0.8rem" }}>
              © 2025 DarWork — Tous droits réservés
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}