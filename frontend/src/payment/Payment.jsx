import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";
import api from "../api/axios";

export default function Paiements() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("paye");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        setError("");
        const params = {
          status: activeTab,
        };
        if (search.trim()) {
          params.search = search.trim();
        }
        const { data } = await api.get("/payments", { params });
        setPayments(data);
      } catch {
        setError("Impossible de charger les paiements");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [activeTab, search]);

  const getDescription = (payment) => {
    if (payment.reservation?.space?.name && payment.reservation?.date) {
      return `Reservation: ${payment.reservation.space.name} (${payment.reservation.date})`;
    }
    if (payment.subscription?.type) {
      return `Abonnement ${payment.subscription.type}`;
    }
    return "Paiement";
  };

  return (
    <div className="body-bg">
      <nav className="navbar">

        
              <div className="logo">
  <div className="circle">DW</div>
  
</div>

          
        <div className="nav-links">
          <button type="button" className="nav-link active" onClick={() => navigate("/accueil")}>
            Accueil
          </button>
          <button type="button" className="nav-link" onClick={() => navigate("/contact")}>
            Contact
          </button>
          <button type="button" className="nav-link" onClick={() => navigate("/dashboard")}>
            Tableau de bord
          </button>
          <button type="button" className="nav-link active" onClick={() => navigate("/espace")}>
            Espaces
          </button>
          <button type="button" className="nav-link" onClick={() => navigate("/reservation")}>
            Reservation
          </button>
        </div>

        
      </nav>

      <main className="main-container">
        <div className="title-section">
          <div className="title-left">
            
            <h1>Paiements</h1>
          </div>

          <div className="search-box">
            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
           
          </div>
        </div>

        <div className="tabs">
          <button
            className={activeTab === "paye" ? "tab-active" : "tab"}
            onClick={() => setActiveTab("paye")}
          >
            Paiements effectues
          </button>
          <button
            className={activeTab === "en_attente" ? "tab-active" : "tab"}
            onClick={() => setActiveTab("en_attente")}
          >
            En attente
          </button>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr className="th">
                <th>ID</th>
                <th>Description</th>
                <th>Montant</th>
                <th>Statut</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan="5">Chargement...</td>
                </tr>
              )}

              {!loading && error && (
                <tr>
                  <td colSpan="5">{error}</td>
                </tr>
              )}

              {!loading && !error && payments.length === 0 && (
                <tr>
                  <td colSpan="5">Aucun paiement trouve.</td>
                </tr>
              )}

              {!loading &&
                !error &&
                payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{getDescription(payment)}</td>
                    <td>{payment.amount} DH</td>
                    <td>
                      <span className="status">{payment.status}</span>
                    </td>
                    <td className="text-right">
                      <button className="pay-btn" disabled={payment.status === "paye"}>
                        {payment.status === "paye" ? "Deja paye" : "Payer"}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          
        </div>
      </main>
    </div>
  );
}