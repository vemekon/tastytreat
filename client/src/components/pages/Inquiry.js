import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import { createProduct } from "../../util/function";
import "./Inquiry.css";

const Inquiry = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [captcha, setCatcha] = useState(false);
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);

  let history = useHistory();
  const subscribeCheck = () => {
    setChecked(!checked);
    //console.log(checked);
  };

  const checkEmail = (e) => {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      e
    )
      ? true
      : false;
  };

  const recaptchaRef = React.createRef();
  const onChange = () => {
    setCatcha(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rValue = recaptchaRef.current.getValue();
    // check if google reCaptcha has value/tick box checked
    if (rValue === "") {
      setCatcha(true);
      return;
    }
    // check if email value is valid
    if (!checkEmail(email)) {
      setEmailErr(true);
      return false;
    }
    const items = { name, email, message, subscribe: checked };

    createProduct(items)
      .then((res) => {
        history.push("/success");
      })
      .catch((err) => {
        setError("Unable to post your inquiry. Please try again later");
      });
    //
  };

  const showError = () => (
    <div className="alert-error" style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  return (
    <div className="form-container">
      {showError()}
      <form className="form" onSubmit={handleSubmit}>
        <div className="inquiry-title">Inquiry Form</div>

        <label>Full Name</label>
        <br />
        <input
          className="text-input"
          type="text"
          name="fname"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Email</label>
        <br />
        <input
          className="text-input"
          type="name"
          name="email"
          value={email}
          onChange={(e) => {
            setError(false);
            setEmailErr(false);
            setEmail(e.target.value);
          }}
        />
        <div
          className="emailError"
          style={{ display: emailErr ? "block" : "none" }}
        >
          Please input a valid email address
        </div>
        <br></br>

        <label>Message</label>
        <br />
        <textarea
          className="text-input"
          name="message"
          value={message}
          style={{ height: "100px" }}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br></br>
        <input
          type="checkbox"
          value={checked}
          className="check-input"
          onChange={() => subscribeCheck()}
        />
        <label>
          {" "}
          Would you like to subscribe to Tasty Treats' newsletter ?{" "}
        </label>
        <br></br>

        <input className="submit-input" type="submit" value="Submit" />
        <div
          className="emailError"
          style={{ display: captcha ? "block" : "none" }}
        >
          Please check the box
        </div>
        <br></br>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LfZM4UaAAAAAJVgxABQZYM5AhHVuRPbw5Y_PUsN"
          onChange={onChange}
        />
      </form>
    </div>
  );
};

export default Inquiry;
