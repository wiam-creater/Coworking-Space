import React from "react";
import "./Tablebord.css";
import { Link, useLocation } from "react-router-dom";


export default function Tablebord() {
  const location = useLocation();

  return (
    <div className="layout">

      {/* NAVBAR */}
      <aside className="sidebar">
        <div className="logo">
          <div className="circle">DW</div>
        </div>

        <nav className="menu">
          <Link to="/accueil" className={location.pathname === "/accueil" ? "active" : ""}>Accueil</Link>
          <Link to="/membres" className={location.pathname === "/membres" ? "active" : ""}>Membres</Link>
          <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>Tableau de bord</Link>
          <Link to="/espace" className={location.pathname === "/espace" ? "active" : ""}>Espaces</Link>
          <Link to="/reservation" className={location.pathname === "/reservation" ? "active" : ""}>Réservations</Link>
          <Link to="/payment" className={location.pathname === "/payment" ? "active" : ""}>Paiement</Link>
        </nav>

        <div className="right-space"></div>
      </aside>

      {/* MAIN */}
      <div className="main">
        <div className="dashboard">

          <h1>Tableau de bord</h1>

          {/* CARDS */}
          <div className="stats">
            <div className="box">
              <h3>Services</h3>
              <p>...</p>
            </div>

            <div className="box">
              <h3>Espaces</h3>
              <p>...</p>
            </div>

            <div className="box">
              <h3>Réservations</h3>
              <p>...</p>
            </div>

            <div className="box">
              <p className="money">MAD ...</p>
              <hr />
              <p className="money-light">...</p>
            </div>
          </div>

          {/* TABLE */}
          <div className="table-card">
            <h2>Statistiques des réservations</h2>

            <table>
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Âge</th>
                  <th>Pseudo</th>
                  <th>Statut</th>
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
                  <td className="center"></td>
                </tr>

                
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}