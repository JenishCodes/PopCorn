import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Auth";
import { register } from "../Services/AuthService";
import Loading from "./Loading";
import "../Styles/auth.css";

function SignUp() {
  const { currentUser } = useContext(AuthContext);
  const [activity, setActivity] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setActivity(true);
    const { name, email, pass } = e.target.elements;
    register(name.value, email.value, pass.value)
      .then((err) => {
        if (err) toast.error(err, { toastId: "err" });
        else toast.success("Successfully created user.");
      })
      .finally(() => setActivity(false));
  };

  return currentUser ? (
    <Redirect to="/" />
  ) : (
    <div id="site-content">
      {activity ? <Loading /> : null}
      <div className="auth-card">
        <h1 className="auth-card-title">Sign Up</h1>
        <form className="auth-card-form" onSubmit={handleSubmit}>
          <input
            id="name"
            type="text"
            className="auth-card-input"
            placeholder="Name"
          />
          <input
            id="email"
            type="text"
            className="auth-card-input"
            placeholder="Email"
          />
          <input
            id="pass"
            type="password"
            className="auth-card-input"
            data-type="password"
            placeholder="Password"
          />
          <input type="submit" className="auth-card-button" value="Sign Up" />
          <Link to="/signin" className="auth-card-link">
            Already Member?
          </Link>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
