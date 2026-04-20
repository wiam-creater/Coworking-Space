import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Reservation.css";
import api from "../api/axios";

export default function Reservation() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        setError("");
        const params = search.trim() ? { search: search.trim() } : {};
        const { data } = await api.get("/reservations", { params });
        setReservations(data);
      } catch {
        setError("Impossible de charger les reservations");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [search]);

  return (
    <div className="body-bg">

      
      <nav className="navbar">

     
        <div className="logo">
          <div className="circle">DW</div>
        </div>

        
        <div className="nav-links">
          <button type="button" className="nav-link" onClick={() => navigate("/accueil")}>
            Accueil
          </button>
          <button type="button" className="nav-link" onClick={() => navigate("/dashboard")}>
            Tableau de bord
          </button>
          <button type="button" className="nav-link" onClick={() => navigate("/espace")}>
            Espaces
          </button>
          <button type="button" className="nav-link active" onClick={() => navigate("/membres")}>
            Gestion Membre
          </button>
        </div>

      </nav>

      {/* ===== MAIN ===== */}
      <main className="main-container">

        <div className="title-section">
          <div className="title-left">
            
            <h1>Réservations</h1>
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

        {/* TABLE */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Membre</th>
                <th>Espace</th>
                <th>Date</th>
                <th>Statut</th>
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

              {!loading && !error && reservations.length === 0 && (
                <tr>
                  <td colSpan="5">Aucune reservation trouvee.</td>
                </tr>
              )}

              {!loading &&
                !error &&
                reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td>{reservation.id}</td>
                    <td>{reservation.user?.name || "-"}</td>
                    <td>{reservation.space?.name || "-"}</td>
                    <td>{reservation.date || "-"}</td>
                    <td>
                      <span className="status">{reservation.status}</span>
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