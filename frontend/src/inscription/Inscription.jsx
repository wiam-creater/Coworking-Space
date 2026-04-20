import "./Inscription.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Inscription() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirmation: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.passwordConfirmation
    ) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (form.password !== form.passwordConfirmation) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      await register(
        form.name,
        form.email,
        form.password,
        form.passwordConfirmation,
        form.phone
      );
      alert("Compte cree avec succes");
      navigate("/login");
    } catch (error) {
      const apiMessage = error?.response?.data?.message;
      alert(apiMessage || "Echec de l'inscription");
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1>Inscription</h1>

        <form onSubmit={handleSubmit}>
          <label>Nom</label>
          <input
            type="text"
            name="name"
            placeholder="Votre nom"
            value={form.name}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="exemple@gmail.com"
            value={form.email}
            onChange={handleChange}
          />

          <label>Téléphone</label>
          <input
            type="text"
            name="phone"
            placeholder="06 00 00 00 00"
            value={form.phone}
            onChange={handleChange}
          />

          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••••"
            value={form.password}
            onChange={handleChange}
          />

          <label>Confirmer le mot de passe</label>
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="••••••••••"
            value={form.passwordConfirmation}
            onChange={handleChange}
          />

          <div className="small-text">
            Veuillez remplir tous les champs
          </div>

          <button type="submit" className="btn" >
            S'inscrire
          </button>
          <button type="button" className="routeur" onClick={() => navigate("/login")}>Retour</button>
             
    
    
          
        </form>
      </div>
    </div>
  );
}