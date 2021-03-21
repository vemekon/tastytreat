import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { authenticate, signin } from "../../util/function";

import "./Signin.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(true);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //calling signin api
      const result = await signin({ email, password });
      const token = result.data.token;
      //const userName = result.data.user.name;
      // saving token on localstorage
      authenticate(token, () => {
        history.push("/");
      });
    } catch (error) {
      setEmail("");
      setPassword("");

      setError(error.response.data.error);
    }
  };
  const showError = () => (
    <p className="alert-error" style={{ display: error ? "" : "none" }}>
      {error}
    </p>
  );

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        {showError()}
        <label>Email</label>
        <br />
        <input
          className="text-input"
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setError("");
            setEmail(e.target.value);
          }}
        />
        <br></br>
        <label>Password</label>
        <br />
        <input
          className="text-input"
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setError("");
            setPassword(e.target.value);
          }}
        />
        <br></br>
        <input className="submit-input" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Signin;
