import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import Accueil           from "./pages/Accueil";
import Login             from "./pages/Login";
import Register          from "./pages/Register";
import Espaces           from "./pages/Espaces";
import Reserve           from "./pages/Reserve";
import MesReservations   from "./pages/MesReservations";
import Abonnement        from "./pages/Abonnement";
import Dashboard         from "./pages/Dashboard";
import AdminReservations from "./pages/AdminReservations";

const getToken = () => localStorage.getItem("token");
const getUser  = () => JSON.parse(localStorage.getItem("user") || "null");

function PrivateRoute({ children }) {
  return getToken() ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const u = getUser();
  if (!getToken())         return <Navigate to="/login"   replace />;
  if (u?.role !== "admin") return <Navigate to="/accueil" replace />;
  return children;
}

function GuestRoute({ children }) {
  return !getToken() ? children : <Navigate to="/accueil" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Publiques ── */}
        <Route path="/"        element={<Accueil />} />
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/espaces" element={<Espaces />} />

        {/* ── Guest seulement ── */}
        <Route path="/login"
          element={<GuestRoute><Login /></GuestRoute>}
        />
        <Route path="/register"
          element={<GuestRoute><Register /></GuestRoute>}
        />

        {/* ── Membre connecté ── */}
        <Route path="/reserve"
          element={<PrivateRoute><Reserve /></PrivateRoute>}
        />
        <Route path="/mes-reservations"
          element={<PrivateRoute><MesReservations /></PrivateRoute>}
        />
        <Route path="/abonnement"
          element={<PrivateRoute><Abonnement /></PrivateRoute>}
        />

        {/* ── Admin seulement ── */}
        <Route path="/dashboard"
          element={<AdminRoute><Dashboard /></AdminRoute>}
        />
        <Route path="/admin/reservations"
          element={<AdminRoute><AdminReservations /></AdminRoute>}
        />

        {/* ── Fallback ── */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}