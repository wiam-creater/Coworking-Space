import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/NavbarPublic";
import api from "../api/axios";

export default function Espaces() {
  const navigate = useNavigate();
  const [spaces,  setSpaces]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur,  setErreur]  = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const { data } = await api.get("/spaces");
        setSpaces(data);
      } catch {
        setErreur("Impossible de charger les espaces.");
      } finally {
        setLoading(false);
      }
    };
    fetchSpaces();
  }, []);

  // ✅ Images différentes par type
  const spaceImages = {
    bureau: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
      "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80",
    ],
    salle_reunion: [
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=600&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=80",
    ],
    espace_ouvert: [
      "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?w=600&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80",
    ],
    cabine: [
      "https://images.unsplash.com/photo-1575540263947-bc28a5e4cf6d?w=600&q=80",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&q=80",
    ],
  };

  const typeLabels = {
    bureau:        "Bureau",
    salle_reunion: "Salle de réunion",
    espace_ouvert: "Espace ouvert",
    cabine:        "Cabine privée",
  };

  const statusStyle = (status) => {
    const map = {
      disponible:   { bg: "rgba(16,185,129,0.15)",  color: "#34D399", label: "Disponible"   },
      indisponible: { bg: "rgba(239,68,68,0.15)",   color: "#F87171", label: "Indisponible" },
      maintenance:  { bg: "rgba(234,179,8,0.15)",   color: "#FBBF24", label: "Maintenance"  },
    };
    return map[status] || map.disponible;
  };

  const getImage = (space, index) => {
    if (space.image) return `http://127.0.0.1:8000/storage/${space.image}`;
    const typeImgs = spaceImages[space.type] || spaceImages.bureau;
    return typeImgs[index % typeImgs.length];
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* ── Hero ── */}
      <section style={{
        padding: "70px 0 50px",
        background: `radial-gradient(ellipse at top, rgba(200,169,110,0.07) 0%, transparent 60%), var(--navy)`
      }}>
        <div className="container text-center">
          <p style={{
            color: "var(--accent)", fontSize: "0.82rem",
            letterSpacing: "2px", textTransform: "uppercase", fontWeight: "600"
          }}>
            Nos espaces
          </p>
          <h1 style={{
            fontSize: "2.4rem", fontWeight: "700",
            margin: "12px 0 16px", color: "var(--vanilla)"
          }}>
            Choisissez votre espace idéal
          </h1>
          <div className="divider-gold mx-auto mb-4"></div>
          <p style={{
            color: "var(--text-muted)", fontSize: "0.95rem",
            maxWidth: "500px", margin: "0 auto"
          }}>
            Des espaces pensés pour votre productivité,
            disponibles à la réservation selon vos besoins.
          </p>
        </div>
      </section>

      {/* ── Cards ── */}
      <section style={{ padding: "20px 0 80px", background: "var(--navy)" }}>
        <div className="container">

          {/* Loading */}
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ color: "var(--accent)" }}></div>
              <p style={{ color: "var(--text-muted)", marginTop: "16px" }}>
                Chargement...
              </p>
            </div>
          )}

          {/* Erreur */}
          {erreur && (
            <div className="text-center py-5">
              <i className="bi bi-wifi-off" style={{ fontSize: "3rem", color: "var(--text-muted)" }}></i>
              <p style={{ color: "#F87171", marginTop: "16px" }}>{erreur}</p>
            </div>
          )}

          {/* Vide */}
          {!loading && !erreur && spaces.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-building-slash" style={{ fontSize: "3rem", color: "var(--text-muted)" }}></i>
              <p style={{ color: "var(--text-muted)", marginTop: "16px" }}>
                Aucun espace disponible.
              </p>
            </div>
          )}

          {/* Grid */}
          <div className="row g-4">
            {!loading && !erreur && spaces.map((space, index) => {
              const img    = getImage(space, index);
              const status = statusStyle(space.status);

              return (
                <div key={space.id} className="col-md-6 col-lg-4 col-xl-3">
                  <div
                    className="card-dark h-100 d-flex flex-column"
                    style={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: "1px solid var(--border-soft)"
                    }}
                  >

                    {/* ── Image ── */}
                    <div style={{
                      position: "relative",
                      height: "190px",
                      overflow: "hidden",
                      flexShrink: 0
                    }}>
                      <img
                        src={img}
                        alt={space.name}
                        style={{
                          width: "100%", height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                          display: "block"
                        }}
                        onMouseOver={e => e.currentTarget.style.transform = "scale(1.06)"}
                        onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                        onError={e => {
                          e.currentTarget.src = spaceImages.bureau[0];
                        }}
                      />

                      {/* Overlay bas */}
                      <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0,
                        height: "70px",
                        background: "linear-gradient(transparent, rgba(15,27,45,0.85))"
                      }} />

                      {/* Badge statut */}
                      <div style={{
                        position: "absolute", top: "10px", right: "10px",
                        background: status.bg,
                        color: status.color,
                        border: `1px solid ${status.color}50`,
                        padding: "3px 10px",
                        borderRadius: "20px",
                        fontSize: "0.72rem",
                        fontWeight: "600",
                        backdropFilter: "blur(6px)",
                        display: "flex", alignItems: "center", gap: "4px"
                      }}>
                        <i className="bi bi-circle-fill" style={{ fontSize: "0.45rem" }}></i>
                        {status.label}
                      </div>

                      {/* Badge type */}
                      <div style={{
                        position: "absolute", top: "10px", left: "10px",
                        background: "rgba(15,27,45,0.75)",
                        color: "var(--accent)",
                        border: "1px solid var(--border)",
                        padding: "3px 10px",
                        borderRadius: "20px",
                        fontSize: "0.72rem",
                        fontWeight: "600",
                        backdropFilter: "blur(6px)"
                      }}>
                        {typeLabels[space.type] || space.type}
                      </div>
                    </div>

                    {/* ── Content ── */}
                    <div className="p-3 d-flex flex-column flex-grow-1">

                      {/* Nom */}
                      <h5 style={{
                        fontWeight: "700", fontSize: "1rem",
                        color: "var(--vanilla)", marginBottom: "6px",
                        fontFamily: "Playfair Display, serif"
                      }}>
                        {space.name}
                      </h5>

                      {/* Description */}
                      {space.description && (
                        <p style={{
                          color: "var(--text-muted)", fontSize: "0.81rem",
                          lineHeight: "1.55", marginBottom: "10px",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden"
                        }}>
                          {space.description}
                        </p>
                      )}

                      {/* Capacité */}
                      <div className="d-flex align-items-center gap-2 mb-3">
                        <i className="bi bi-people"
                          style={{ color: "var(--accent)", fontSize: "0.85rem" }}>
                        </i>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.81rem" }}>
                          Capacité : {space.capacity} personne{space.capacity > 1 ? "s" : ""}
                        </span>
                      </div>

                      {/* Prix + Bouton */}
                      <div className="mt-auto">

                        {/* Prix */}
                        <div style={{
                          background: "rgba(200,169,110,0.07)",
                          border: "1px solid var(--border)",
                          borderRadius: "10px",
                          padding: "9px 14px",
                          marginBottom: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between"
                        }}>
                          <span style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>
                            Prix / heure
                          </span>
                          <span style={{
                            color: "var(--accent)", fontWeight: "700",
                            fontSize: "1.05rem",
                            fontFamily: "Playfair Display, serif"
                          }}>
                            {parseFloat(space.price_per_hour).toFixed(0)} DH
                          </span>
                        </div>

                        {/* Bouton selon statut et auth */}
                        {space.status === "disponible" ? (
                          token ? (
                            <button
                              className="btn-accent w-100 justify-content-center"
                              style={{
                                padding: "10px", fontSize: "0.87rem",
                                borderRadius: "10px"
                              }}
                              onClick={() => navigate("/reserve")}
                            >
                              <i className="bi bi-calendar-plus"></i>
                              Réserver
                            </button>
                          ) : (
                            <Link
                              to="/login"
                              className="btn-outline-accent w-100 justify-content-center"
                              style={{
                                padding: "10px", fontSize: "0.87rem",
                                borderRadius: "10px", textDecoration: "none"
                              }}
                            >
                              <i className="bi bi-box-arrow-in-right"></i>
                              Connexion pour réserver
                            </Link>
                          )
                        ) : (
                          <button
                            disabled
                            style={{
                              width: "100%", padding: "10px",
                              fontSize: "0.87rem", borderRadius: "10px",
                              background: "rgba(255,255,255,0.04)",
                              color: "var(--text-muted)",
                              border: "1px solid var(--border-soft)",
                              cursor: "not-allowed",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "7px"
                            }}
                          >
                            <i className="bi bi-slash-circle"></i>
                            Indisponible
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}