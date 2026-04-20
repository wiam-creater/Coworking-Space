import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./login/Login";
import Accueil from "./accueil/Accueil";
import Payment from "./payment/Payment";
import Inscription from "./inscription/Inscription";
import Reservation from "./reservation/Reservation";
import Membre from "./gestionmembre/Membre";
import Reserve from "./reserve/Reserve";
import Espace from "./espace/Espace";
import Tablebord from "./tablebord/Tablebord";
import Contact from "./contact/Contact";
import Offre from "./offre/Offre";


import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/membres" element={<Membre />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/espace" element={<Espace />} />
          <Route path="/offre" element={<Offre />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Tablebord />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;