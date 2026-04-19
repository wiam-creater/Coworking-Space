import React from "react";
import "./Payment.css";

export default function Paiements() {
  return (
    <div className="body-bg">
      <nav className="navbar">

        
              <div className="logo">
  <div className="circle">DW</div>
  
</div>

          
        <div className="nav-links">
          <a href="#" className="active"  onClick={() => window.location.href = "/accueil"}> Accueil</a>
          <a href="#" onClick={() => window.location.href = "/contact"}> Contact</a>
        <  a onClick={() => window.location.href = "/dashboard"}>Tableau de bord</a>
          <a href="#" className="active" onClick={() => window.location.href = "/Detailespace"}>Espaces </a>
          <a href="#" onClick={() => window.location.href = "/reservation"} >Reservation</a>
        </div>

        
      </nav>

      <main className="main-container">
        <div className="title-section">
          <div className="title-left">
            
            <h1>Paiements</h1>
          </div>

          <div className="search-box">
            <input type="text" placeholder="search" />
           
          </div>
        </div>

        <div className="tabs">
          <button className="tab-active">Paiements effectués</button>
          <button className="tab">En attente</button>
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
              <tr>
                <td>1.</td>
                <td>Réservation : Bureau A 9/11/2025</td>
                <td>1000 DH</td>
                <td><span className="status">En attente</span></td>
                <td className="text-right">
                  <button className="pay-btn">Payer </button>
                </td>
              </tr>

              <tr>
                <td>2.</td>
                <td>Réservation : Bureau C 15/11/2025</td>
                <td>500 DH</td>
                <td><span className="status">En attente</span></td>
                <td className="text-right">
                  <button className="pay-btn">Payer </button>
                </td>
              </tr>
            </tbody>
          </table>

          
        </div>
      </main>
    </div>
  );
}