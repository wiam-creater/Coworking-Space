import React from "react";
import "./Membre.css";
import { Link, useLocation } from "react-router-dom";

export default function Membre() {
  const location = useLocation();

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
                <input type="text" placeholder="Rechercher un membre..." />
              </div>

              <button className="add-btn">Ajouter</button>
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
                  <tr>
                    <td>
                      <div className="name"></div>
                      <div className="job"></div>
                    </td>
                    <td></td>
                    <td></td>
                    
                  </tr>

                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}