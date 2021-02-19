import React from "react";
import Home from "./Components/Home";
import { Route } from "react-router-dom";
import Profile from "./Components/Profile";
import MoviePage from "./Components/MoviePage";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { AuthProvider } from "./Auth";
import ResetPassword from "./Components/PasswordReset";
import { ToastContainer } from "react-toastify";
import "../src/Assets/fonts/font-awesome.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <ToastContainer />
      <React.Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <Route path="/resetpassword" component={ResetPassword} />
        <Route path="/movie/:title" component={MoviePage} />
        <Route path="/profile/:username" component={Profile} />
      </React.Fragment>
      <Footer />
    </AuthProvider>
  );
}

export default App;
