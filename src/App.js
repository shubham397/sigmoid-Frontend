import React from "react";
import { Provider } from "react-redux";
import store from "./Store";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
