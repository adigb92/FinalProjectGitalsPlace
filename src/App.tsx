import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import About from "./components/About";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import AdminDashboard from "./components/AdminDashboard";
import ServiceDetails from "./components/ServiceDetails";
import Favorites from "./components/Favorites";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BookAppointment from "./components/BookAppointment/BookAppointment";
import BookingCreated from "./components/BookingCreated";
import { AuthProvider, } from "./contexts/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContentForm from "./components/ContentForm";
import AllAppointments from "./components/AllAppointments";
import aboutBackground from "./assets/images/about_pic.jpeg";
import ContactUs from "./components/ContactUs";
import MessagesFromUsers from "./components/MessagesFromUsers";

function App() {

  const [version, setVersion] = useState(0);

  useEffect(() => {
    setVersion(prevVersion => prevVersion + 1);
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <AppContent key={version} />
          <Footer />
          <ToastContainer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

function AppContent() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/about" element={<About background={aboutBackground} />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/messages" element={<MessagesFromUsers />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/contform" element={<ContentForm />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/service" element={<ServiceDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/allapp" element={<AllAppointments />} />
        <Route path="/success" element={<BookingCreated />} />
      </Routes>
    </>
  );
}

export default App;
