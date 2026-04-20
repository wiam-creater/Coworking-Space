import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      const data = await login(email, password);
      const destination = data?.user?.role === "admin" ? "/dashboard" : "/accueil";
      navigate(destination);
    } catch {
      alert("Email ou mot de passe incorrect ");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>

        <form onSubmit={handleSubmit} className="login-form">
          
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          
          <button type="submit">Se Connecter</button>

          <p className="signup-text">
            <span onClick={() => navigate("/inscription")} className="signup-link">
              Créer un compte
            </span>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;