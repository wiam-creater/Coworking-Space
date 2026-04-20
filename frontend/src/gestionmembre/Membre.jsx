import React, { useEffect, useState } from "react";
import "./Membre.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Membre() {
  const location = useLocation();
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        setError("");
        const params = search.trim() ? { search: search.trim() } : {};
        const { data } = await api.get("/members", { params });
        setMembers(data);
      } catch {
        setError("Impossible de charger les membres");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [search]);

  return (
    <div className="layout">

      {/* NAVBAR */}
      <aside className="sidebar">

        {/* LOGO */}
        <div className="logo">
          <div className="circle">DW</div>
        </div>

        {/* MENU */}
        <nav className="menu">
          <Link to="/accueil" className={location.pathname === "/accueil" ? "active" : ""}>Accueil</Link>
          <Link to="/membres" className={location.pathname === "/membres" ? "active" : ""}>Membres</Link>
          <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>Tableau de bord</Link>
          <Link to="/Detailespace" className={location.pathname === "/Detailespace" ? "active" : ""}>Espaces</Link>
          <Link to="/reservation" className={location.pathname === "/reservation" ? "active" : ""}>Réservations</Link>
          <Link to="/payment" className={location.pathname === "/payment" ? "active" : ""}>Paiement</Link>
        </nav>

        {/* RIGHT SPACE */}
        <div className="right-space"></div>

      </aside>

      {/* MAIN */}
      <div className="main">
        <main className="content">
          <div className="card">

            <h1>Gestion des membres</h1>

            <div className="top-bar">
              <div className="search small">
                <input
                  type="text"
                  placeholder="Rechercher un membre..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <button className="add-btn" onClick={() => navigate("/inscription")}>
                Ajouter
              </button>
            </div>

            {/* TABLE */}
            <div className="table-box">
              <table>
                <thead>
                  <tr >
                    <th>Nom</th>
                    <th>Email</th>

                    <th>Télé</th>
                  </tr>
                </thead>

                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan="3">Chargement...</td>
                    </tr>
                  )}

                  {!loading && error && (
                    <tr>
                      <td colSpan="3">{error}</td>
                    </tr>
                  )}

                  {!loading && !error && members.length === 0 && (
                    <tr>
                      <td colSpan="3">Aucun membre trouve.</td>
                    </tr>
                  )}

                  {!loading &&
                    !error &&
                    members.map((member) => (
                      <tr key={member.id}>
                        <td>
                          <div className="name">{member.name}</div>
                        </td>
                        <td>{member.email}</td>
                        <td>{member.phone || "-"}</td>
                      </tr>
                    ))}

                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}