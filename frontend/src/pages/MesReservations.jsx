import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavbarPublic";
import api from "../api/axios";

export default function MesReservations() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [erreur,       setErreur]       = useState("");
  const [search,       setSearch]       = useState("");

  const fetchReservations = async (q = "") => {
    try {
      setLoading(true);
      const params = q.trim() ? { search: q.trim() } : {};
      const { data } = await api.get("/reservations", { params });
      setReservations(data);
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
      else setErreur("Impossible de charger vos réservations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReservations(); }, []);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => fetchReservations(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const statusBadge = (s) => {
    const map = {
      en_attente: { class: "badge-attente",   label: "En attente",  icon: "bi-clock" },
      confirmee:  { class: "badge-confirmee", label: "Confirmée",   icon: "bi-check-circle" },
      annulee:    { class: "badge-annulee",   label: "Annulée",     icon: "bi-x-circle" },
      terminee:   { class: "badge-terminee",  label: "Terminée",    icon: "bi-flag" },
    };
    const b = map[s] || { class: "badge-terminee", label: s, icon: "bi-circle" };
    return (
      <span className={b.class}>
        <i className={`bi ${b.icon} me-1`}></i>{b.label}
      </span>
    );
  };

  const user = JSON.parse(localStorage.getItem("user") || "null");

  return (
    <div className="page-wrapper">
      <Navbar />

      <div style={{
        minHeight: "calc(100vh - 73px)",
        padding: "60px 16px",
        background: `radial-gradient(ellipse at top, rgba(201,168,76,0.05) 0%, transparent 50%), var(--dark)`
      }}>
        <div className="container">

          {/* ── Header ── */}
          <div className="d-flex align-items-start justify-content-between flex-wrap gap-3 mb-5">
            <div>
              <p style={{ color: "var(--gold)", fontSize: "0.82rem", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "600", marginBottom: "8px" }}>
                Espace membre
              </p>
              <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "6px" }}>
                Mes Réservations
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Bonjour <span style={{ color: "var(--gold)" }}>{user?.name}</span> — voici l'historique de vos réservations
              </p>
            </div>
            <button
              className="btn-gold d-flex align-items-center gap-2"
              style={{ padding: "12px 24px", fontSize: "0.9rem", borderRadius: "12px" }}
              onClick={() => navigate("/reserve")}
            >
              <i className="bi bi-calendar-plus"></i>
              Nouvelle réservation
            </button>
          </div>

          {/* ── Stats rapides ── */}
          <div className="row g-3 mb-5">
            {[
              {
                label: "Total",
                value: reservations.length,
                icon: "bi-calendar2",
                color: "var(--gold)"
              },
              {
                label: "En attente",
                value: reservations.filter(r => r.status === "en_attente").length,
                icon: "bi-clock",
                color: "#FFC107"
              },
              {
                label: "Confirmées",
                value: reservations.filter(r => r.status === "confirmee").length,
                icon: "bi-check-circle",
                color: "#20C997"
              },
              {
                label: "Annulées",
                value: reservations.filter(r => r.status === "annulee").length,
                icon: "bi-x-circle",
                color: "#FF6B6B"
              },
            ].map((s, i) => (
              <div key={i} className="col-6 col-md-3">
                <div className="card-dark p-3 d-flex align-items-center gap-3">
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "12px",
                    background: `${s.color}18`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <i className={`bi ${s.icon}`} style={{ color: s.color, fontSize: "1.2rem" }}></i>
                  </div>
                  <div>
                    <div style={{ fontSize: "1.4rem", fontWeight: "700", lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "3px" }}>{s.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Recherche ── */}
          <div className="mb-4">
            <div style={{ position: "relative", maxWidth: "400px" }}>
              <i className="bi bi-search" style={{
                position: "absolute", left: "14px", top: "50%",
                transform: "translateY(-50%)", color: "var(--text-muted)", fontSize: "0.9rem"
              }}></i>
              <input
                type="text"
                className="form-dark"
                placeholder="Rechercher un espace, statut..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: "40px" }}
              />
            </div>
          </div>

          {/* ── Table ── */}
          <div className="card-dark" style={{ borderRadius: "16px", overflow: "hidden" }}>

            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border" style={{ color: "var(--gold)" }}></div>
                <p style={{ color: "var(--text-muted)", marginTop: "12px", fontSize: "0.9rem" }}>
                  Chargement...
                </p>
              </div>
            )}

            {!loading && erreur && (
              <div className="text-center py-5">
                <i className="bi bi-exclamation-circle" style={{ fontSize: "2.5rem", color: "#FF6B6B" }}></i>
                <p style={{ color: "#FF6B6B", marginTop: "12px" }}>{erreur}</p>
              </div>
            )}

            {!loading && !erreur && reservations.length === 0 && (
              <div className="text-center py-5">
                <i className="bi bi-calendar-x" style={{ fontSize: "3rem", color: "var(--text-muted)" }}></i>
                <p style={{ color: "var(--text-muted)", marginTop: "16px", fontSize: "0.95rem" }}>
                  Aucune réservation trouvée.
                </p>
                <button
                  className="btn-gold mt-3"
                  style={{ padding: "10px 24px", fontSize: "0.88rem", borderRadius: "10px" }}
                  onClick={() => navigate("/reserve")}
                >
                  Faire une réservation
                </button>
              </div>
            )}

            {!loading && !erreur && reservations.length > 0 && (
              <div style={{ overflowX: "auto" }}>
                <table className="table-dark-custom">
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>Espace</th>
                      <th>Date</th>
                      <th>Créneau</th>
                      <th>Durée</th>
                      <th>Prix</th>
                      <th>Notes</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map(r => {
                      // Calcul durée
                      let dureeStr = "—";
                      if (r.start_time && r.end_time) {
                        const [sh, sm] = r.start_time.split(":").map(Number);
                        const [eh, em] = r.end_time.split(":").map(Number);
                        const mins = (eh * 60 + em) - (sh * 60 + sm);
                        if (mins > 0) {
                          dureeStr = `${Math.floor(mins / 60)}h${mins % 60 > 0 ? `${mins % 60}m` : ""}`;
                        }
                      }
                      return (
                        <tr key={r.id}>
                          <td>
                            <span style={{
                              background: "rgba(201,168,76,0.1)",
                              color: "var(--gold)",
                              padding: "3px 10px",
                              borderRadius: "8px",
                              fontSize: "0.8rem",
                              fontWeight: "600"
                            }}>
                              #{r.id}
                            </span>
                          </td>
                          <td>
                            <div style={{ fontWeight: "500", color: "var(--text-light)", fontSize: "0.88rem" }}>
                              {r.space?.name || "—"}
                            </div>
                          </td>
                          <td>
                            <div style={{ fontSize: "0.88rem" }}>
                              <i className="bi bi-calendar2 me-1" style={{ color: "var(--gold)" }}></i>
                              {r.date || "—"}
                            </div>
                          </td>
                          <td style={{ fontSize: "0.85rem" }}>
                            {r.start_time && r.end_time
                              ? `${r.start_time.slice(0,5)} → ${r.end_time.slice(0,5)}`
                              : "—"}
                          </td>
                          <td style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                            {dureeStr}
                          </td>
                          <td>
                            <span style={{ color: "var(--gold)", fontWeight: "600", fontSize: "0.9rem" }}>
                              {r.total_price ? `${r.total_price} DH` : "—"}
                            </span>
                          </td>
                          <td style={{ fontSize: "0.82rem", color: "var(--text-muted)", maxWidth: "120px" }}>
                            <span style={{ 
                              display: "block", overflow: "hidden",
                              textOverflow: "ellipsis", whiteSpace: "nowrap"
                            }}>
                              {r.notes || "—"}
                            </span>
                          </td>
                          <td>{statusBadge(r.status)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}