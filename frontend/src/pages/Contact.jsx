import Navbar from "../components/Navbar";

export default function Contact() {
  return (
    <div>
      <Navbar />

      <div className="container mt-5">
        <h2>Contact - Dar Work Lux</h2>

        <div className="row mt-4">
          <div className="col-md-6">
            <h5>Informations</h5>
            <p>Email: contact@darworklux.com</p>
            <p>Téléphone: 06 00 00 00 00</p>
            <p>Adresse: Casablanca</p>
          </div>

          <div className="col-md-6">
            <h5>Envoyer un message</h5>

            <input className="form-control mt-2" placeholder="Nom" />
            <input className="form-control mt-2" placeholder="Email" />
            <textarea className="form-control mt-2" placeholder="Message"></textarea>

            <button className="btn btn-warning mt-3">
              Envoyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}