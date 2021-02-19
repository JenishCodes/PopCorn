import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Auth";
import { login } from "../Services/AuthService";
import Loading from "./Loading";
import "../Styles/auth.css";


function SignIn() {
  const { currentUser } = useContext(AuthContext);
  const [activity, setActivity] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setActivity(true);
    const { email, pass } = e.target.elements;
    login(email.value, pass.value)
      .then((err) => {
        if (err) toast.error(err, { toastId: "err" });
      })
      .finally(() => setActivity(false));
  };

  return currentUser ? (
    <Redirect to="/" />
  ) : (
    <div id="site-content">
      {activity ? <Loading /> : null}
      <div className="auth-card">
        <h2 className="auth-card-title">Sign In</h2>
        <form className="auth-card-form" onSubmit={handleSubmit}>
          <input
            id="email"
            type="text"
            className="auth-card-input"
            placeholder="Email"
          />
          <br />
          <input
            id="pass"
            type="password"
            className="auth-card-input"
            data-type="password"
            placeholder="Password"
          />
          <br />
          <input type="submit" className="auth-card-button" value="Sign In" />
          <br />
          <Link to="/resetpassword" className="auth-card-link">
            Forgot Password?
          </Link>
          <br />
          <br />
          <Link to="/signup" className="auth-card-link">
            Don't have an account?
          </Link>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
