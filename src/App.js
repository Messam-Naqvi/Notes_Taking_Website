import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Note" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
