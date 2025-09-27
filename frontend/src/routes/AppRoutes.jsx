import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NotePage from "../pages/NotePage";


import { useAuth } from "../context/AuthContext";
import NoteForm from "../components/NoteForm";

export default function AppRoutes() {
  const { token } = useAuth();


  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/login" element={<LoginPage />} />

   
        <Route
          path="/"
          element={token ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/note/:id"
          element={token ? <NotePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/note/:id/edit"
          element={token ? <NoteForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/new"
          element={token ? <NoteForm /> : <Navigate to="/login" />}
        />

       
        <Route path="*" element={<Navigate to={token ? "/" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}
