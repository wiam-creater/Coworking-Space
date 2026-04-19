import React, { useState } from "react";
import "./Reserve.css";

function Reserve() {

  const [formData, setFormData] = useState({
    nom: "",
    date: "",
    debut: "",
    fin: "",
    statut: "Bureau Moderne"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  const form = new FormData();
  form.append("name", formData.nom);
  form.append("date", formData.date);
  form.append("space_id", 1); 

 fetch(fetch("/reservations"), {
    method: "POST",
    body: form
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      alert("Réservation confirmée ");
      window.location.href = "/accueil";
    })
    .catch(err => {
      console.error(err);
      alert("Erreur réservation annuler ");
    });
};
 

  return (
    <div className="reserve-container">

      <div className="reserve-card">
        <h1>Réservation </h1>

        <form className="reserve-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Nom</label>
            <input 
              type="text" 
              name="nom"
              placeholder="Votre nom..."
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input 
              type="date" 
              name="date"
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Heure début</label>
              <input 
                type="time" 
                name="debut"
                onChange={handleChange}
              />
            </div> <br />

            <div className="form-group">
              <label>Heure fin</label>
              <input 
                type="time" 
                name="fin"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Espace</label>
            <select 
              name="statut"
              onChange={handleChange}
              value={formData.statut}
            >
              <option>Bureau Moderne</option>
              <option>Salle Réunion</option>
              <option>Bureau Privé</option>
              <option>Zone Étude</option>
            </select>
          </div>

          <button type="submit" className="reserve-btn">
            Confirmer
          </button>

        </form>
      </div>

    </div>
  );
}

export default Reserve;