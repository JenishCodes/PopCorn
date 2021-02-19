import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../Auth";
import { resetPassword } from "../Services/AuthService";
import Loading from "./Loading";
import "../Styles/auth.css";

function ResetPassword() {
  const { currentUser } = useContext(AuthContext);
  const [sent, setSent] = useState(false);
  const [activity, setActivity] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();
    setActivity(true);
    const { email } = e.target.elements;
    resetPassword(email.value).then((err) => {
      if (err) toast.error(err, { toastId: "err" });
      else {
        toast.success("Password reset link has been sent to " + email.value, {
          toastId: "info",
        });
        setSent(true);
      }
    }).finally(()=>setActivity(true));
  };

  return currentUser ? (
    <Redirect to="/" />
  ) : sent ? (
    <Redirect to="/signin" />
  ) : (
    <div id="site-content">
      {activity ? <Loading /> : null}
      <div className="auth-card">
        <h2 className="auth-card-title">Reset Password</h2>
        <form className="auth-card-form" onSubmit={handleSubmit}>
          <input
            id="email"
            type="text"
            className="auth-card-input"
            placeholder="Email"
          />
          <button className="auth-card-button">Get Link</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
