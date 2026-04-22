import React, { useEffect, useState } from "react";
import Layout from "../components/NavbarPublic";
import { paymentService } from "../api/services";

export default function Payment() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState("");
  const [onglet, setOnglet]     = useState("tous");

  useEffect(() => {
    paymentService.getAll()
      .then((res) => setPayments(res.data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = payments.filter((p) => {
    const matchTab = onglet === "tous" ? true : p.status === onglet;
    const desc = p.reservation ? `${p.reservation.space?.name} ${p.reservation.date}` : p.subscription?.type || "";
    return matchTab && desc.toLowerCase().includes(search.toLowerCase());
  });

  const totalPaye    = payments.filter((p) => p.status === "paye").reduce((s, p) => s + parseFloat(p.amount), 0);
  const totalAttente = payments.filter((p) => p.status === "en_attente").reduce((s, p) => s + parseFloat(p.amount), 0);

  const getDesc = (p) => p.reservation
    ? `Réservation — ${p.reservation.space?.name || "—"} (${p.reservation.date})`
    : p.subscription ? `Abonnement ${p.subscription.type}` : "—";

  const statusBadge = (status) => {
    const cfg = {
      paye:       { bg: "#d4edda", color: "#155724", label: "Payé"       },
      en_attente: { bg: "#fff3cd", color: "#856404", label: "En attente" },
      rembourse:  { bg: "#cce5ff", color: "#004085", label: "Remboursé"  },
      echoue:     { bg: "#f8d7da", color: "#721c24", label: "Échoué"     },
    };
    const s = cfg[status] || { bg: "#e2e3e5", color: "#383d41", label: status };
    return <span className="badge-status" style={{ background: s.bg, color: s.color }}>{s.label}</span>;
  };

  return (
    <Layout>
      <div className="mb-4">
        <h4 className="fw-bold" style={{ color: "#1B2A4A" }}>Paiements</h4>
        <p className="text-muted small">Historique de vos transactions</p>
      </div>

      {/* Résumé */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <div className="card-dw p-3 text-center">
            <div className="fw-bold" style={{ fontSize: 22, color: "#1B2A4A" }}>{totalPaye.toFixed(0)} DH</div>
            <div className="small text-muted">Total payé</div>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="card-dw p-3 text-center">
            <div className="fw-bold" style={{ fontSize: 22, color: "#C8A97E" }}>{totalAttente.toFixed(0)} DH</div>
            <div className="small text-muted">En attente</div>
          </div>
        </div>
      </div>

      <div className="card-dw p-3">
        {/* Onglets */}
        <div className="d-flex gap-2 mb-3 flex-wrap">
          {[["tous","Tous"],["paye","Payés"],["en_attente","En attente"]].map(([val, label]) => (
            <button key={val} onClick={() => setOnglet(val)}
              className={`btn btn-sm ${onglet === val ? "btn-navy" : "btn-outline-secondary"}`}
              style={{ borderRadius: 20 }}>
              {label}
            </button>
          ))}
          <input className="form-control form-control-sm ms-auto" placeholder="Rechercher..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ borderRadius: 20, maxWidth: 200 }}/>
        </div>

        {loading ? (
          <div className="text-center py-4"><div className="spinner-border" style={{ color: "#1B2A4A" }}/></div>
        ) : (
          <div className="table-responsive">
            <table className="table table-dw mb-0">
              <thead>
                <tr>
                  <th>#ID</th><th>Description</th><th>Méthode</th><th>Montant</th><th>Date</th><th>Référence</th><th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id}>
                    <td className="text-muted small">#{p.id}</td>
                    <td className="small">{getDesc(p)}</td>
                    <td><span className="badge bg-light text-dark">{p.method}</span></td>
                    <td className="fw-bold">{parseFloat(p.amount).toFixed(2)} DH</td>
                    <td className="small">{p.payment_date ? new Date(p.payment_date).toLocaleDateString("fr-FR") : "—"}</td>
                    <td className="small text-muted">{p.reference || "—"}</td>
                    <td>{statusBadge(p.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}