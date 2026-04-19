import "./Inscription.css";
import { useNavigate } from "react-router-dom";



export default function Inscription() {
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();

    alert(" Bienvenue avec nous chez DAR WORK !");
    navigate("/accueil");
  };
  return (
    <div className="page">
      <div className="container">
        <h1>Inscription</h1>

        <form onSubmit={handleSubmit}>
          <label>Nom</label>
          <input type="text" placeholder="Votre nom" />

          <label>Prénom</label>
          <input type="text" placeholder="Votre prénom" />

          <label>Email</label>
          <input type="email" placeholder="exemple@gmail.com" />

          <label>Téléphone</label>
          <input type="text" placeholder="06 00 00 00 00" />

          <label>Adresse</label>
          <input type="text" placeholder="Votre adresse" />

          <label>Mot de passe</label>
          <input type="password" placeholder="••••••••••" />

          <div className="small-text">
            Veuillez remplir tous les champs
          </div>

          <button type="submit" className="btn" >
            S'inscrire
          </button>
          <button className="routeur" className="routeur" onClick={() => navigate("/accueil")}>Retour</button>
             
    
    
          
        </form>
      </div>
    </div>
  );
}