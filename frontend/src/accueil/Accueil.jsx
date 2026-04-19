import React from "react";
import "./Accueil.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Accueil() {

const { logout } = useAuth();
const navigate = useNavigate();

return ( <div>


  {/* NAVBAR */}
  <header className="navbar">
    <div className="logo">
      <div className="circle">DW</div>
    </div>

    <ul className="menu">
      <li onClick={() => navigate("/")}>Accueil</li>
      <li onClick={() => navigate("/inscription")}>Inscription</li>
      <li onClick={() => navigate("/payment")}>Payment</li>
      <li onClick={() => navigate("/reserve")}>Reservation</li>
      <li onClick={() => navigate("/contact")}>Contact</li>
      <li onClick={() => navigate("/login")}>Se connecter</li>
    </ul>
  </header>

  {/* HERO */}
  <section className="hero">
    <div className="hero-text">
      <h1>Dar Work Coworking Experience</h1>
      <p className="description">
        Un espace moderne, élégant et confortable, conçu pour offrir une ambiance calme et inspirante, idéale pour travailler efficacement en toute sérénité.
      </p>

      <button className="btn primary" onClick={() => navigate("/espace")}>
        Découvrir
      </button>
    </div>

    <div className="hero-img">
      <img
        className="img1"
        src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80"
        alt=""
      />
    </div>
  </section>

  {/* ESPACES */}
  <section className="espaces">
    <h2 className="title">Nos Espaces</h2>

    <div className="grid">

      <div className="card">
        <div className="img">
          <img 
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <p className="title-lux">Espace Bureau Moderne</p>
        <button className="btn primary" onClick={() => navigate("/reserve")}>
          Réserver
        </button>
      </div>

      <div className="card">
        <div className="img">
          <img 
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <p className="title-lux">Salle Réunion</p>
        <button className="btn primary" onClick={() => navigate("/reserve")}>
          Réserver
        </button>
      </div>

      <div className="card">
        <div className="img">
          <img 
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <p className="title-lux">Bureau Privé</p>
        <button className="btn primary" onClick={() => navigate("/reserve")}>
          Réserver
        </button>
      </div>

    </div>
  </section>

  {/* NOS AVANTAGES */}
  <section className="avantages">
    <h2 className="title">Nos Avantages</h2>
    <p className="subtitle">Trouvez l'offre qui vous convient</p>

    <div className="avantages-grid">
      <div className="avantage">
        <img src="https://img.icons8.com/ios-filled/100/1f2a44/wifi.png" alt="wifi" />
        <p>WiFi Haut Débit</p>
      </div>

      <div className="avantage">
        <img src="https://img.icons8.com/ios-filled/100/1f2a44/espresso-cup.png" alt="coffee" />
        <p>Café Gratuit</p>
      </div>

      <div className="avantage">
        <img src="https://img.icons8.com/ios-filled/100/1f2a44/clock.png" alt="access" />
        <p>Accès 24/7</p>
      </div>

      <div className="avantage">
        <img src="https://img.icons8.com/ios-filled/100/1f2a44/sofa.png" alt="sofa" />
        <p>Espace Confortable</p>
      </div>
    </div>
  </section>

  {/* NOS ABONNEMENTS */}
  <section className="abonnements">
    <h2 className="title">Nos Abonnements</h2>
    <p className="subtitle">Trouvez l'offre qui vous convient</p>

    <div className="abonnement-grid">

      <div className="abonnement-card">
        <h3>Journalier</h3>
        <p>Pass 1 jour - <strong>99 DH</strong></p>
        <button className="btn primary" onClick={() => navigate("/offre")}>
          Voir les Offres
        </button>
      </div>

      <div className="abonnement-card">
        <h3>Mensuel</h3>
        <p>Abonnement - <strong>900 DH / mois</strong></p>
        <button className="btn primary" onClick={() => navigate("/offre")}>
          Voir les Offres
        </button>
      </div>

      <div className="abonnement-card">
        <h3>Professionnel</h3>
        <p>Pack Business sur mesure</p>
        <button className="btn primary" onClick={() => navigate("/offre")}>
          Voir les Offres
        </button>
      </div>

    </div>
  </section>

  {/* FOOTER */}
  <footer className="footer">
    © 2026 Dar Work - All rights reserved
  </footer>

</div>


);
}
