import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavbarPublic";
import api from "../api/axios";

export default function Reserve() {
  const navigate  = useNavigate();
  const [spaces,  setSpaces]  = useState([]);
  const [loading, setLoading] = useState(false);
  const [erreur,  setErreur]  = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    space_id:   "",
    date:       "",
    start_time: "",
    end_time:   "",
    notes:      "",
  });

  // Charger les espaces
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const { data } = await api.get("/spaces");
        setSpaces(data);
        if (data.length > 0) {
          setForm(f => ({ ...f, space_id: String(data[0].id) }));
        }
      } catch {
        setErreur("Impossible de charger les espaces.");
      }
    };
    fetchSpaces();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErreur("");
  };

  // Espace sélectionné
  const selectedSpace = spaces.find(s => String(s.id) === String(form.space_id));

  // Calcul durée et prix estimé
  const calcDuree = () => {
    if (!form.start_time || !form.end_time) return null;
    const [sh, sm] = form.start_time.split(":").map(Number);
    const [eh, em] = form.end_time.split(":").map(Number);
    const mins = (eh * 60 + em) - (sh * 60 + sm);
    return mins > 0 ? mins : null;
  };

  const duree = calcDuree();
  const prix  = duree && selectedSpace
    ? ((duree / 60) * selectedSpace.price_per_hour).toFixed(2)
    : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur("");

    if (!form.space_id) { setErreur("Veuillez choisir un espace."); return; }
    if (!form.date)     { setErreur("Veuillez choisir une date.");   return; }
    if (!duree || duree <= 0) {
      setErreur("L'heure de fin doit être après l'heure de début.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/reservations", {
        space_id:   Number(form.space_id),
        date:       form.date,
        start_time: form.start_time,
        end_time:   form.end_time,
        notes:      form.notes || null,
      });
      setSuccess(true);
      setTimeout(() => navigate("/mes-reservations"), 1500);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      } else if (err.response?.status === 422) {
        const errors = err.response.data?.errors;
        if (errors) {
          setErreur(Object.values(errors)[0][0]);
        } else {
          setErreur(err.response.data?.message || "Ce créneau est déjà réservé.");
        }
      } else {
        setErreur("Erreur serveur. Réessayez plus tard.");
      }
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="page-wrapper">
      <Navbar />

      <div style={{
        minHeight: "calc(100vh - 73px)",
        padding: "60px 16px",
        background: `radial-gradient(ellipse at top, rgba(201,168,76,0.06) 0%, transparent 60%), var(--dark)`
      }}>
        <div className="container">
          <div className="row justify-content-center">

            {/* ── Formulaire ── */}
            <div className="col-lg-6">

              <div className="text-center mb-4">
                <div style={{
                  width: "64px", height: "64px", borderRadius: "16px",
                  background: "rgba(201,168,76,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px"
                }}>
                  <i className="bi bi-calendar-plus" style={{ color: "var(--gold)", fontSize: "1.8rem" }}></i>
                </div>
                <h2 style={{ fontWeight: "700", fontSize: "1.8rem", marginBottom: "8px" }}>
                  Nouvelle réservation
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
                  Choisissez votre espace et votre créneau
                </p>
              </div>

              <div className="card-dark p-4">

                {/* Succès */}
                {success && (
                  <div className="d-flex align-items-center gap-2 mb-3" style={{
                    background: "rgba(25,135,84,0.1)",
                    border: "1px solid rgba(25,135,84,0.3)",
                    borderRadius: "10px", padding: "12px 16px"
                  }}>
                    <i className="bi bi-check-circle" style={{ color: "#20C997" }}></i>
                    <span style={{ color: "#20C997", fontSize: "0.88rem" }}>
                      Réservation confirmée ! Redirection...
                    </span>
                  </div>
                )}

                {/* Erreur */}
                {erreur && (
                  <div className="d-flex align-items-center gap-2 mb-3" style={{
                    background: "rgba(220,53,69,0.1)",
                    border: "1px solid rgba(220,53,69,0.3)",
                    borderRadius: "10px", padding: "12px 16px"
                  }}>
                    <i className="bi bi-exclamation-circle" style={{ color: "#FF6B6B" }}></i>
                    <span style={{ color: "#FF6B6B", fontSize: "0.88rem" }}>{erreur}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit}>

                  {/* Espace */}
                  <div className="mb-3">
                    <label className="label-dark">
                      <i className="bi bi-building me-1"></i>Espace
                    </label>
                    <select
                      name="space_id"
                      className="form-dark"
                      value={form.space_id}
                      onChange={handleChange}
                      required
                    >
                      <option value="">— Choisir un espace —</option>
                      {spaces.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.name} — {s.price_per_hour} DH/h
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date */}
                  <div className="mb-3">
                    <label className="label-dark">
                      <i className="bi bi-calendar me-1"></i>Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      className="form-dark"
                      value={form.date}
                      onChange={handleChange}
                      min={today}
                      required
                    />
                  </div>

                  {/* Heures */}
                  <div className="row g-3 mb-3">
                    <div className="col-6">
                      <label className="label-dark">
                        <i className="bi bi-clock me-1"></i>Heure début
                      </label>
                      <input
                        type="time"
                        name="start_time"
                        className="form-dark"
                        value={form.start_time}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-6">
                      <label className="label-dark">
                        <i className="bi bi-clock-fill me-1"></i>Heure fin
                      </label>
                      <input
                        type="time"
                        name="end_time"
                        className="form-dark"
                        value={form.end_time}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="mb-4">
                    <label className="label-dark">
                      <i className="bi bi-chat-text me-1"></i>Notes
                      <span style={{ color: "var(--text-muted)", marginLeft: "4px" }}>(optionnel)</span>
                    </label>
                    <textarea
                      name="notes"
                      className="form-dark"
                      placeholder="Informations supplémentaires..."
                      value={form.notes}
                      onChange={handleChange}
                      rows={3}
                      style={{ resize: "none" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold w-100 d-flex align-items-center justify-content-center gap-2"
                    style={{ padding: "13px", fontSize: "0.95rem", borderRadius: "12px" }}
                    disabled={loading || success}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm"></span>
                        Envoi...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-circle"></i>
                        Valider la réservation
                      </>
                    )}
                  </button>

                </form>
              </div>
            </div>

            {/* ── Résumé ── */}
            <div className="col-lg-4 d-none d-lg-block">
              <div className="card-dark p-4" style={{ position: "sticky", top: "100px" }}>
                <h6 style={{ color: "var(--gold)", fontWeight: "600", marginBottom: "20px", fontSize: "0.85rem", letterSpacing: "1px", textTransform: "uppercase" }}>
                  <i className="bi bi-receipt me-2"></i>Résumé
                </h6>

                {/* Espace */}
                <div className="mb-3 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "4px" }}>Espace</div>
                  <div style={{ fontWeight: "600", fontSize: "0.95rem" }}>
                    {selectedSpace ? selectedSpace.name : "—"}
                  </div>
                </div>

                {/* Date */}
                <div className="mb-3 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "4px" }}>Date</div>
                  <div style={{ fontWeight: "600", fontSize: "0.95rem" }}>
                    {form.date || "—"}
                  </div>
                </div>

                {/* Créneau */}
                <div className="mb-3 pb-3" style={{ borderBottom: "1px solid var(--border)" }}>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "4px" }}>Créneau</div>
                  <div style={{ fontWeight: "600", fontSize: "0.95rem" }}>
                    {form.start_time && form.end_time
                      ? `${form.start_time} → ${form.end_time}`
                      : "—"}
                  </div>
                  {duree && (
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
                      Durée : {Math.floor(duree / 60)}h{duree % 60 > 0 ? `${duree % 60}min` : ""}
                    </div>
                  )}
                </div>

                {/* Prix estimé */}
                <div style={{
                  background: "rgba(201,168,76,0.08)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px", padding: "16px"
                }}>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "6px" }}>
                    Prix estimé
                  </div>
                  <div style={{ fontSize: "1.8rem", fontWeight: "700", color: "var(--gold)", fontFamily: "Playfair Display, serif" }}>
                    {prix ? `${prix} DH` : "—"}
                  </div>
                  {selectedSpace && (
                    <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "4px" }}>
                      {selectedSpace.price_per_hour} DH/h
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}