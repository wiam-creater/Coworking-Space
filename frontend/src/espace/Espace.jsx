import React, { useEffect, useState } from "react";
import "./Espace.css";

const Espace = () => {

  const [espaces, setEspaces] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/spaces")
      .then(res => res.json())
      .then(data => setEspaces(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="espace-page">
      <h1>Nos Espaces</h1>

      <div className="espace-container">
        {espaces.length === 0 ? (
          <p>Aucun espace pour le moment</p>
        ) : (
          espaces.map((item) => (
            <div className="espace-card" key={item.id}>
              
              <img 
                src={item.image || "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"} 
                alt={item.name} 
              />

              <div className="card-content">
                <h3>{item.name}</h3>
                
                <p>{item.description}</p>

                <span className="price">{item.price} DH</span>

                <button onClick={() => window.location.href = "/reserve"}>
                  Réserver
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Espace;