import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Features from "./components/Features";
import GetStarted from "./components/GetStarted";
import Faq from "./components/Faq";
import AboutUs from "./components/AboutUs";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Form from "./pages/Form"; // Ensure Form.jsx exists
import Pricing from "./components/Pricing";


const App = () => {
  return (
    <Router>
      
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Features />
              <GetStarted />
              <Faq />
              <Pricing/>
              <AboutUs />
              <Footer />
            </>
          }
        />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
  );
};

export default App;
