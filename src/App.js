import React from "react";
import "./App.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EditJob from "./components/EditJob/EditJob";
import AddJob from "./components/AddJob/AddJob";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:text" element={<Home />} />
        <Route path="/editJob/:id" element={<EditJob />} />
        <Route path="/create" element={<AddJob />} />
      </Routes>
    </Router>
  );
}

export default App;
