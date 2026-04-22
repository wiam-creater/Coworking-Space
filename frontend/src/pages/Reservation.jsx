import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function Reservation() {
  const [spaces, setSpaces] = useState([]);
  const [form, setForm] = useState({});

  useEffect(() => {
    API.get("/spaces").then((res) => setSpaces(res.data));
  }, []);

  const handleSubmit = async () => {
    try {
      await API.post("/reservations", form);
      alert("Réservation envoyée !");
    } catch (err) {
      alert(err.response?.data?.message || "Erreur");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-4">
        <h2>Réserver un espace</h2>

        <select
          className="form-control mt-3"
          onChange={(e) => setForm({ ...form, space_id: e.target.value })}
        >
          <option>Choisir espace</option>
          {spaces.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} - {s.price_per_hour} DH/h
            </option>
          ))}
        </select>

        <input type="date" className="form-control mt-3"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <input type="time" className="form-control mt-3"
          onChange={(e) => setForm({ ...form, start_time: e.target.value })}
        />

        <input type="time" className="form-control mt-3"
          onChange={(e) => setForm({ ...form, end_time: e.target.value })}
        />

        <textarea className="form-control mt-3"
          placeholder="Notes"
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <button className="btn btn-warning mt-3" onClick={handleSubmit}>
          Réserver
        </button>
      </div>
    </div>
  );
}