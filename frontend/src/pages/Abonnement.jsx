import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavbarPublic";

export default function Abonnement() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "499",
      periode: "/ mois",
      icon: "bi-lightning",
      color: "#818CF8",
      desc: "Idéal pour les freelances et indépendants",
      features: [
        "10 jours d'accès / mois",
        "Zone open space",
        "Internet fibre inclus",
        "Café & snacks",
        "Accès 8h → 18h",
      ],
      unavailable: ["Salles de réunion", "Bureau privé", "Accès 24h/7j"]
    },
    {
      id: "pro",
      name: "Pro",
      price: "999",
      periode: "/ mois",
      icon: "bi-star",
      color: "var(--gold)",
      desc: "Pour les professionnels et équipes",
      popular: true,
      features: [
        "Accès illimité",
        "Bureau dédié",
        "4h salles de réunion / mois",
        "Internet fibre inclus",
        "Café & snacks premium",
        "Accès 7h → 22h",
        "Casier sécurisé",
      ],
      unavailable: ["Accès 24h/7j"]
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "2499",
      periode: "/ mois",
      icon: "bi-building",
      color: "#20C997",
      desc: "Pour les équipes et entreprises",
      features: [
        "Accès illimité 24h/7j",
        "Bureau privé dédié",
        "Salles de réunion illimitées",
        "Internet fibre premium",
        "Café & snacks premium",
        "Parking inclus",
        "Domiciliation postale",
        "Support prioritaire",
      ],
      unavailable: []
    },
  ];

  const handleChoisir = (plan) => {
    setSelected(plan.id);
    setTimeout(() => {
      alert(`✅ Demande d'abonnement "${plan.name}" envoyée !\nNotre équipe vous contactera sous 24h.`);
      setSelected(null);
    }, 800);
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div style={{
        minHeight: "calc(100vh - 73px)",
        padding: "60px 16px",
        background: `radial-gradient(ellipse at top, rgba(201,168,76,0.06) 0%, transparent 60%), var(--dark)`
      }}>
        <div className="container">

          {/* ── Header ── */}
          <div className="text-center mb-5">
            <p style={{ color: "var(--gold)", fontSize: "0.85rem", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "600" }}>
              Abonnements
            </p>
            <h1 style={{ fontSize: "2.5rem", fontWeight: "700", margin: "12px 0 16px" }}>
              Choisissez votre formule
            </h1>
            <div className="divider-gold mx-auto mb-4"></div>
            <p style={{ color: "var(--text-muted)", fontSize: "1rem", maxWidth: "500px", margin: "0 auto" }}>
              Des formules flexibles adaptées à chaque besoin. Sans engagement minimum.
            </p>
          </div>

          {/* ── Plans ── */}
          <div className="row g-4 justify-content-center mb-5">
            {plans.map((plan) => (
              <div key={plan.id} className="col-md-6 col-lg-4">
                <div
                  className="card-dark h-100 d-flex flex-column"
                  style={{
                    borderRadius: "24px",
                    border: plan.popular
                      ? `2px solid var(--gold)`
                      : "1px solid var(--border)",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  {/* Badge populaire */}
                  {plan.popular && (
                    <div style={{
                      position: "absolute", top: "0", left: "50%",
                      transform: "translateX(-50%)",
                      background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                      color: "#000", fontSize: "0.72rem", fontWeight: "700",
                      padding: "4px 20px",
                      borderRadius: "0 0 12px 12px",
                      letterSpacing: "1px", textTransform: "uppercase"
                    }}>
                      ⭐ Populaire
                    </div>
                  )}

                  <div className="p-4 pt-5 flex-grow-1 d-flex flex-column">

                    {/* Icon + Name */}
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <div style={{
                        width: "52px", height: "52px", borderRadius: "14px",
                        background: `${plan.color}18`,
                        display: "flex", alignItems: "center", justifyContent: "center"
                      }}>
                        <i className={`bi ${plan.icon}`} style={{ color: plan.color, fontSize: "1.4rem" }}></i>
                      </div>
                      <div>
                        <h5 style={{ fontWeight: "700", margin: 0, fontSize: "1.1rem" }}>{plan.name}</h5>
                        <p style={{ color: "var(--text-muted)", fontSize: "0.8rem", margin: 0 }}>{plan.desc}</p>
                      </div>
                    </div>

                    {/* Prix */}
                    <div className="mb-4">
                      <span style={{
                        fontSize: "2.5rem", fontWeight: "700",
                        color: plan.color,
                        fontFamily: "Playfair Display, serif"
                      }}>
                        {plan.price}
                      </span>
                      <span style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginLeft: "4px" }}>
                        DH{plan.periode}
                      </span>
                    </div>

                    {/* Features disponibles */}
                    <div className="flex-grow-1">
                      {plan.features.map((f, i) => (
                        <div key={i} className="d-flex align-items-center gap-2 mb-2">
                          <i className="bi bi-check-circle-fill" style={{ color: "#20C997", fontSize: "0.85rem", flexShrink: 0 }}></i>
                          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{f}</span>
                        </div>
                      ))}

                      {/* Features non disponibles */}
                      {plan.unavailable.map((f, i) => (
                        <div key={i} className="d-flex align-items-center gap-2 mb-2">
                          <i className="bi bi-x-circle" style={{ color: "var(--text-muted)", fontSize: "0.85rem", flexShrink: 0, opacity: 0.4 }}></i>
                          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", opacity: 0.4 }}>{f}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <button
                      className={plan.popular ? "btn-gold" : "btn-outline-gold"}
                      style={{
                        width: "100%", marginTop: "24px",
                        padding: "12px", fontSize: "0.9rem",
                        borderRadius: "12px",
                        display: "flex", alignItems: "center",
                        justifyContent: "center", gap: "8px"
                      }}
                      onClick={() => handleChoisir(plan)}
                      disabled={selected === plan.id}
                    >
                      {selected === plan.id ? (
                        <>
                          <span className="spinner-border spinner-border-sm"></span>
                          Envoi...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-arrow-right-circle"></i>
                          Choisir {plan.name}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ── FAQ rapide ── */}
          <div className="card-dark p-4 p-md-5" style={{ borderRadius: "20px" }}>
            <h4 style={{ fontWeight: "700", marginBottom: "24px", textAlign: "center" }}>
              Questions fréquentes
            </h4>
            <div className="row g-4">
              {[
                { q: "Puis-je changer de formule ?",         r: "Oui, vous pouvez upgrader ou downgrader votre abonnement à tout moment." },
                { q: "Y a-t-il un engagement minimum ?",     r: "Non, tous nos abonnements sont sans engagement. Résiliable à tout moment." },
                { q: "Comment se passe le paiement ?",       r: "Paiement mensuel par virement ou espèces à l'accueil de l'espace." },
                { q: "Puis-je inviter des collègues ?",      r: "Oui, selon votre formule, vous pouvez inviter des visiteurs ponctuellement." },
              ].map((faq, i) => (
                <div key={i} className="col-md-6">
                  <div style={{
                    background: "var(--dark-3)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px", padding: "20px"
                  }}>
                    <h6 style={{ color: "var(--gold)", fontWeight: "600", marginBottom: "10px", fontSize: "0.9rem" }}>
                      <i className="bi bi-question-circle me-2"></i>{faq.q}
                    </h6>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", margin: 0, lineHeight: "1.6" }}>
                      {faq.r}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}