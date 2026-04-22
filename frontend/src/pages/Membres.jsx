import { useEffect, useState } from "react";
import API from "../api/axios";
import Navbar from "../components/Navbar";

export default function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    API.get("/members").then((res) => setMembers(res.data));
  }, []);

  return (
    <div>
      <Navbar />

      <div className="container mt-4">
        <h2>Liste des Membres</h2>

        <table className="table mt-3">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
            </tr>
          </thead>

          <tbody>
            {members.map((m) => (
              <tr key={m.id}>
                <td>{m.name}</td>
                <td>{m.email}</td>
                <td>{m.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}