import React from "react";
import "./Contact.css";
import { Link, useLocation } from "react-router-dom";

export default function Contact() {
  const location = useLocation();

  return (
    <div className="layout contact-page"> 

      {/* NAVBAR */}
      <aside className="sidebar">
        <div className="logo">
          <div className="circle">DW</div>
        </div>

        <nav className="menu">
          <Link to="/accueil" className={location.pathname === "/accueil" ? "active" : ""}>Accueil</Link>
          <Link to="/espace" className={location.pathname === "/espace" ? "active" : ""}>Espace</Link>
          <Link to="/reserve" className={location.pathname === "/reserv" ? "active" : ""}>Reserve</Link>
          <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact</Link>
        </nav>

        <div className="right-space"></div>
      </aside>

      {/* MAIN */}
      <div className="main">
        <div className="contact-card">

          <h1>Contactez-nous</h1>

          <div className="contact-grid">

            <div className="item">
              <span className="tt">Télé</span>
              <p>+212 6 12 34 56 78</p>
              <p>+212 5 22 33 44 55</p>
            </div>

            <div className="item">
              <span className="tt">Mail</span>
              <p>DarWork@gmail.com</p>
            </div>

            <div className="item">
              <span className="tt">Instagram</span>
              <p>darwork@gmail.com</p>
            </div>

            <div className="item">
              <span className="tt">Facebook</span>
              <p>darwork.com</p>
            </div>

            <div className="item full">
              <span className="tt">Adresse</span>
              <p>Fés, Maroc - Centre Ville</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}