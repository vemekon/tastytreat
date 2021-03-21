import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../../util/function.js";
import "./Signup.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.length < 3 || password.length < 3) {
      setError("You need to fil the fields with minimun of four characters");
      return;
    }

    try {
      const result = await signup({ name, email, password });

      setSuccess(true);
      setEmail("");
      setPassword("");
      setName("");
      setError("");
      console.log(result);
    } catch (error) {
      setEmail("");
      setPassword("");
      setSuccess("");

      setError(error.response.data.error);
    }
  };
  const showError = () => (
    <p className="alert-error" style={{ display: error ? "" : "none" }}>
      {error}
    </p>
  );
  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      {" "}
      User successfully created. Please <Link to="/signin"> sign in </Link>
    </div>
  );

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        {showError()}
        <label>Full Name</label>
        <br />
        <input
          className="text-input"
          type="text"
          name="fname"
          value={name}
          onChange={(e) => {
            setError("");
            setName(e.target.value);
          }}
        />
        <br />
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
        <br></br>
        {showSuccess()}
        <br></br>
      </form>
    </div>
  );
};

export default Register;
