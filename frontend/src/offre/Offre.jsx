import React from "react";
import "./Offre.css";

export default function Offre() {
  return (
    <div className="offre-page">

      {/* NAVBAR*/}
      <header className="navbar">
        <div className="logo">
          <div className="circle">DW</div>
        </div>

        <ul className="menu">
          <li onClick={() => window.location.href = "/accueil"}>Accueil</li>
          <li onClick={() => window.location.href = "/espace"}>Espaces</li>
          
          <li className="active" onClick={() => window.location.href = "/reserve"}>Reservation</li>
          <li onClick={() => window.location.href = "/contact"}>Contact</li>
        </ul>
      </header>

      {/* TITLE */}
      <div className="offre-header">
        <h1>Nos Offres</h1>
        <p>Choisissez l’offre qui vous convient</p>
      </div>

      {/* CARDS */}
      <section className="offre-container">

        {/* JOURNALIER */}
        <div className="offre-card">
          <h3>Journalier</h3>
          <p className="price">99 DH / jour</p>

          <p className="desc">
            Profitez d’un espace calme et moderne pour une journée complète.
          </p>

          <ul className="details">
            <li>WiFi haut débit</li>
            <li>Café gratuit</li>
            <li>Accès journée entière</li>
            <li>Ambiance professionnelle</li>
          </ul>

          
        </div>

        {/* MENSUEL */}
        <div className="offre-card premium">
          <span className="badge">Best</span>
          <h3>Mensuel</h3>
          <p className="price">900 DH / mois</p>

          <p className="desc">
            Accès illimité avec des services premium pour travailler librement.
          </p>

          <ul className="details">
            <li>Accès 7j/7</li>
            <li>WiFi rapide</li>
            <li>Salle réunion incluse</li>
            <li>Espace personnel</li>
          </ul>

          
        </div>

        {/* PRO */}
        <div className="offre-card">
          <h3>Professionnel</h3>
          <p className="price">Sur mesure</p>

          <p className="desc">
            Solution idéale pour entreprises avec services personnalisés.
          </p>

          <ul className="details">
            <li>Bureau privé</li>
            <li>Accès 24/7</li>
            <li>Réunions illimitées</li>
            <li>Services premium</li>
          </ul>

          
        </div>

      </section>

    </div>
  );
}