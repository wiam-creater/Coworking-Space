import React from "react";
import "./Reservation.css";

export default function Reservation() {
  return (
    <div className="body-bg">

      
      <nav className="navbar">

     
        <div className="logo">
          <div className="circle">DW</div>
        </div>

        
        <div className="nav-links">
          <a onClick={() => window.location.href = "/accueil"}>Accueil</a>
          <a onClick={() => window.location.href = "/dashboard"}>Tableau de bord</a>
          <a onClick={() => window.location.href = "/espace"}>Espaces</a>
          <a className="active" onClick={() => window.location.href = "/membres"}>Gestion Membre</a>
        </div>

      </nav>

      {/* ===== MAIN ===== */}
      <main className="main-container">

        <div className="title-section">
          <div className="title-left">
            
            <h1>Réservations</h1>
          </div>

          <div className="search-box">
            <input type="text" placeholder="Search..." />
          </div>
        </div>

        {/* TABLE */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#ID</th>
                <th>Espace</th>
                <th>Date</th>
                <th>Statut</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td><span className="status"></span></td>
                <td className="text-right">
                  <button className="action-btn">Voir</button>
                </td>
              </tr>

              <tr>
                <td>2.</td>
                <td>Bureau C</td>
                <td>15/11/2025</td>
                <td><span className="status">En attente</span></td>
                <td className="text-right">
                  <button className="action-btn">Voir</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}