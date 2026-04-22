import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavbarPublic";
import api from "../api/axios";

export default function AdminReservations() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [erreur,       setErreur]       = useState("");
  const [search,       setSearch]       = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const fetchReservations = async (q = "", status = "") => {
    try {
      setLoading(true);
      const params = {};
      if (q.trim())     params.search = q.trim();
      if (status)       params.status = status;
      const { data } = await api.get("/reservations", { params });
      setReservations(data);
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
      else setErreur("Impossible de charger les réservations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReservations(); }, []);

  useEffect(() => {
    const t = setTimeout(() => fetchReservations(search, filterStatus), 400);
    return () => clearTimeout(t);
  }, [search, filterStatus]);

  const statusBadge = (s) => {
    const map = {
      en_attente: { class: "badge-attente",   label: "En attente", icon: "bi-clock"        },
      confirmee:  { class: "badge-confirmee", label: "Confirmée",  icon: "bi-check-circle"  },
      annulee:    { class: "badge-annulee",   label: "Annulée",    icon: "bi-x-circle"      },
      terminee:   { class: "badge-terminee",  label: "Terminée",   icon: "bi-flag"          },
    };
    const b = map[s] || { class: "badge-terminee", label: s, icon: "bi-circle" };
    return (
      <span className={b.class}>
        <i className={`bi ${b.icon} me-1`}></i>{b.label}
      </span>
    );
  };

  // Stats filtrées
  const total      = reservations.length;
  const enAttente  = reservations.filter(r => r.status === "en_attente").length;
  const confirmees = reservations.filter(r => r.status === "confirmee").length;
  const annulees   = reservations.filter(r => r.status === "annulee").length;
  const revenus    = reservations
    .filter(r => r.status === "confirmee")
    .reduce((sum, r) => sum + parseFloat(r.total_price || 0), 0)
    .toFixed(2);

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
                Administration
              </p>
              <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "6px" }}>
                Toutes les réservations
              </h1>
              <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                Gérez et suivez toutes les réservations des membres
              </p>
            </div>
            <button
              className="btn-outline-gold d-flex align-items-center gap-2"
              style={{ padding: "10px 20px", fontSize: "0.88rem", borderRadius: "10px" }}
              onClick={() => navigate("/dashboard")}
            >
              <i className="bi bi-arrow-left"></i>
              Dashboard
            </button>
          </div>

          {/* ── KPI ── */}
          <div className="row g-3 mb-5">
            {[
              { label: "Total",       value: total,      icon: "bi-calendar2",      color: "var(--gold)", filter: "" },
              { label: "En attente",  value: enAttente,  icon: "bi-clock",          color: "#FFC107",     filter: "en_attente" },
              { label: "Confirmées",  value: confirmees, icon: "bi-check-circle",   color: "#20C997",     filter: "confirmee"  },
              { label: "Annulées",    value: annulees,   icon: "bi-x-circle",       color: "#FF6B6B",     filter: "annulee"    },
              { label: "Revenus DH",  value: `${revenus}`, icon: "bi-cash-stack",  color: "#818CF8",     filter: ""           },
            ].map((s, i) => (
              <div key={i} className="col-6 col-md-4 col-lg">
                <div
                  className="card-dark p-3 d-flex align-items-center gap-3"
                  style={{
                    cursor: s.filter ? "pointer" : "default",
                    borderColor: filterStatus === s.filter && s.filter ? s.color : "var(--border)",
                    transition: "border-color 0.2s"
                  }}
                  onClick={() => s.filter && setFilterStatus(
                    filterStatus === s.filter ? "" : s.filter
                  )}
                >
                  <div style={{
                    width: "42px", height: "42px", borderRadius: "12px",
                    background: `${s.color}18`,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                  }}>
                    <i className={`bi ${s.icon}`} style={{ color: s.color, fontSize: "1.1rem" }}></i>
                  </div>
                  <div>
                    <div style={{ fontSize: "1.4rem", fontWeight: "700", color: s.color, lineHeight: 1 }}>
                      {s.value}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "3px" }}>
                      {s.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Filtres ── */}
          <div className="d-flex gap-3 flex-wrap mb-4">

            {/* Recherche */}
            <div style={{ position: "relative", flex: "1", minWidth: "220px", maxWidth: "400px" }}>
              <i className="bi bi-search" style={{
                position: "absolute", left: "14px", top: "50%",
                transform: "translateY(-50%)", color: "var(--text-muted)", fontSize: "0.9rem"
              }}></i>
              <input
                type="text"
                className="form-dark"
                placeholder="Rechercher membre, espace..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: "40px" }}
              />
            </div>

            {/* Filtre statut */}
            <select
              className="form-dark"
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              style={{ maxWidth: "200px" }}
            >
              <option value="">Tous les statuts</option>
              <option value="en_attente">En attente</option>
              <option value="confirmee">Confirmée</option>
              <option value="annulee">Annulée</option>
              <option value="terminee">Terminée</option>
            </select>

            {/* Reset */}
            {(search || filterStatus) && (
              <button
                className="btn-outline-gold"
                style={{ padding: "10px 16px", fontSize: "0.85rem", borderRadius: "10px" }}
                onClick={() => { setSearch(""); setFilterStatus(""); }}
              >
                <i className="bi bi-x-circle me-1"></i>Reset
              </button>
            )}
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
                <p style={{ color: "var(--text-muted)", marginTop: "16px" }}>
                  Aucune réservation trouvée.
                </p>
              </div>
            )}

            {!loading && !erreur && reservations.length > 0 && (
              <div style={{ overflowX: "auto" }}>
                <table className="table-dark-custom">
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>Membre</th>
                      <th>Email</th>
                      <th>Espace</th>
                      <th>Date</th>
                      <th>Créneau</th>
                      <th>Prix</th>
                      <th>Notes</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map(r => (
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
                          <div className="d-flex align-items-center gap-2">
                            <div style={{
                              width: "32px", height: "32px", borderRadius: "50%",
                              background: "rgba(201,168,76,0.15)",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: "0.8rem", fontWeight: "600", color: "var(--gold)",
                              flexShrink: 0
                            }}>
                              {r.user?.name?.charAt(0).toUpperCase() || "?"}
                            </div>
                            <span style={{ fontSize: "0.88rem", color: "var(--text-light)", fontWeight: "500" }}>
                              {r.user?.name || "—"}
                            </span>
                          </div>
                        </td>
                        <td style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                          {r.user?.email || "—"}
                        </td>
                        <td style={{ fontSize: "0.88rem" }}>
                          {r.space?.name || "—"}
                        </td>
                        <td style={{ fontSize: "0.85rem" }}>
                          <i className="bi bi-calendar2 me-1" style={{ color: "var(--gold)" }}></i>
                          {r.date || "—"}
                        </td>
                        <td style={{ fontSize: "0.82rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                          {r.start_time && r.end_time
                            ? `${r.start_time.slice(0,5)} → ${r.end_time.slice(0,5)}`
                            : "—"}
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
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Footer table */}
            {!loading && reservations.length > 0 && (
              <div className="d-flex align-items-center justify-content-between px-4 py-3"
                style={{ borderTop: "1px solid var(--border)" }}>
                <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  {reservations.length} réservation{reservations.length > 1 ? "s" : ""} affichée{reservations.length > 1 ? "s" : ""}
                </span>
                <span style={{ fontSize: "0.82rem", color: "var(--gold)", fontWeight: "600" }}>
                  Total confirmé : {revenus} DH
                </span>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}