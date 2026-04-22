import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavbarPublic";
import api from "../api/axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats,    setStats]    = useState(null);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [members, reservations, spaces, payments] = await Promise.all([
          api.get("/members"),
          api.get("/reservations"),
          api.get("/spaces"),
          api.get("/payments"),
        ]);

        const res = reservations.data;
        const pay = payments.data;

        setStats({
          totalMembers:      members.data.length,
          totalSpaces:       spaces.data.length,
          totalReservations: res.length,
          enAttente:         res.filter(r => r.status === "en_attente").length,
          confirmees:        res.filter(r => r.status === "confirmee").length,
          annulees:          res.filter(r => r.status === "annulee").length,
          revenus:           pay.filter(p => p.status === "paye")
                               .reduce((sum, p) => sum + parseFloat(p.amount || 0), 0)
                               .toFixed(2),
          recentRes:         res.slice(0, 5),
          recentMembers:     members.data.slice(0, 5),
        });
      } catch (err) {
        if (err.response?.status === 401) navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statusBadge = (s) => {
    const map = {
      en_attente: { class: "badge-attente",   label: "En attente" },
      confirmee:  { class: "badge-confirmee", label: "Confirmée"  },
      annulee:    { class: "badge-annulee",   label: "Annulée"    },
      terminee:   { class: "badge-terminee",  label: "Terminée"   },
    };
    const b = map[s] || { class: "badge-terminee", label: s };
    return <span className={b.class}>{b.label}</span>;
  };

  if (loading) return (
    <div className="page-wrapper">
      <Navbar />
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
        <div className="text-center">
          <div className="spinner-border" style={{ color: "var(--gold)", width: "3rem", height: "3rem" }}></div>
          <p style={{ color: "var(--text-muted)", marginTop: "16px" }}>Chargement du tableau de bord...</p>
        </div>
      </div>
    </div>
  );

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
          <div className="mb-5">
            <p style={{ color: "var(--gold)", fontSize: "0.82rem", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "600", marginBottom: "8px" }}>
              Administration
            </p>
            <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "6px" }}>
              Tableau de bord
            </h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Vue globale de votre espace de coworking
            </p>
          </div>

          {/* ── KPI Cards ── */}
          <div className="row g-4 mb-5">
            {[
              { label: "Membres",        value: stats.totalMembers,      icon: "bi-people",        color: "#818CF8", link: "/membres" },
              { label: "Espaces",        value: stats.totalSpaces,       icon: "bi-building",      color: "var(--gold)", link: "/espaces" },
              { label: "Réservations",   value: stats.totalReservations, icon: "bi-calendar-check",color: "#20C997", link: "/admin/reservations" },
              { label: "Revenus (DH)",   value: `${stats.revenus} DH`,   icon: "bi-cash-stack",    color: "#FB7185", link: "/payments" },
            ].map((k, i) => (
              <div key={i} className="col-6 col-lg-3">
                <div
                  className="card-dark p-4"
                  style={{ cursor: "pointer", borderRadius: "20px" }}
                  onClick={() => navigate(k.link)}
                >
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div style={{
                      width: "48px", height: "48px", borderRadius: "14px",
                      background: `${k.color}18`,
                      display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      <i className={`bi ${k.icon}`} style={{ color: k.color, fontSize: "1.3rem" }}></i>
                    </div>
                    <i className="bi bi-arrow-up-right" style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}></i>
                  </div>
                  <div style={{ fontSize: "1.8rem", fontWeight: "700", fontFamily: "Playfair Display, serif", color: k.color }}>
                    {k.value}
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "4px" }}>
                    {k.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Statuts réservations ── */}
          <div className="row g-4 mb-5">
            {[
              { label: "En attente", value: stats.enAttente,  color: "#FFC107", icon: "bi-clock-history" },
              { label: "Confirmées", value: stats.confirmees, color: "#20C997", icon: "bi-check-circle"  },
              { label: "Annulées",   value: stats.annulees,   color: "#FF6B6B", icon: "bi-x-circle"      },
            ].map((s, i) => (
              <div key={i} className="col-md-4">
                <div className="card-dark p-3 d-flex align-items-center gap-3">
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "12px",
                    background: `${s.color}18`,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                  }}>
                    <i className={`bi ${s.icon}`} style={{ color: s.color, fontSize: "1.2rem" }}></i>
                  </div>
                  <div>
                    <div style={{ fontSize: "1.5rem", fontWeight: "700", color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>{s.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── Dernières réservations + Derniers membres ── */}
          <div className="row g-4">

            {/* Réservations récentes */}
            <div className="col-lg-7">
              <div className="card-dark" style={{ borderRadius: "16px", overflow: "hidden" }}>
                <div className="d-flex align-items-center justify-content-between p-4"
                  style={{ borderBottom: "1px solid var(--border)" }}>
                  <h6 style={{ fontWeight: "600", margin: 0, fontSize: "0.95rem" }}>
                    <i className="bi bi-calendar-check me-2" style={{ color: "var(--gold)" }}></i>
                    Dernières réservations
                  </h6>
                  <button
                    className="btn-outline-gold"
                    style={{ fontSize: "0.78rem", padding: "5px 14px", borderRadius: "8px" }}
                    onClick={() => navigate("/admin/reservations")}
                  >
                    Voir tout
                  </button>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table className="table-dark-custom">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Membre</th>
                        <th>Espace</th>
                        <th>Date</th>
                        <th>Statut</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentRes.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center" style={{ color: "var(--text-muted)", padding: "30px" }}>
                            Aucune réservation
                          </td>
                        </tr>
                      ) : stats.recentRes.map(r => (
                        <tr key={r.id}>
                          <td>
                            <span style={{ color: "var(--gold)", fontWeight: "600", fontSize: "0.82rem" }}>
                              #{r.id}
                            </span>
                          </td>
                          <td style={{ fontSize: "0.88rem", color: "var(--text-light)" }}>
                            {r.user?.name || "—"}
                          </td>
                          <td style={{ fontSize: "0.85rem" }}>{r.space?.name || "—"}</td>
                          <td style={{ fontSize: "0.85rem" }}>{r.date || "—"}</td>
                          <td>{statusBadge(r.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Derniers membres */}
            <div className="col-lg-5">
              <div className="card-dark" style={{ borderRadius: "16px", overflow: "hidden" }}>
                <div className="p-4" style={{ borderBottom: "1px solid var(--border)" }}>
                  <h6 style={{ fontWeight: "600", margin: 0, fontSize: "0.95rem" }}>
                    <i className="bi bi-people me-2" style={{ color: "var(--gold)" }}></i>
                    Derniers membres
                  </h6>
                </div>
                <div className="p-3">
                  {stats.recentMembers.length === 0 ? (
                    <p className="text-center" style={{ color: "var(--text-muted)", padding: "20px" }}>
                      Aucun membre
                    </p>
                  ) : stats.recentMembers.map((m, i) => (
                    <div key={m.id} className="d-flex align-items-center gap-3 p-2"
                      style={{
                        borderRadius: "10px",
                        marginBottom: "4px",
                        transition: "background 0.2s",
                        cursor: "default"
                      }}
                      onMouseOver={e => e.currentTarget.style.background = "rgba(201,168,76,0.05)"}
                      onMouseOut={e => e.currentTarget.style.background = "transparent"}
                    >
                      <div style={{
                        width: "38px", height: "38px", borderRadius: "50%",
                        background: `hsl(${i * 60}, 60%, 25%)`,
                        border: "2px solid var(--border)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.9rem", fontWeight: "600",
                        color: `hsl(${i * 60}, 80%, 70%)`,
                        flexShrink: 0
                      }}>
                        {m.name?.charAt(0).toUpperCase()}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: "500", fontSize: "0.88rem", color: "var(--text-light)" }}>
                          {m.name}
                        </div>
                        <div style={{
                          fontSize: "0.78rem", color: "var(--text-muted)",
                          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                        }}>
                          {m.email}
                        </div>
                      </div>
                      <div style={{
                        fontSize: "0.72rem", color: "var(--text-muted)",
                        background: "var(--dark-3)",
                        padding: "3px 8px", borderRadius: "6px", flexShrink: 0
                      }}>
                        {m.created_at?.split("T")[0]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}