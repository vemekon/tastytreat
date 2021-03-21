import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Services from "./components/pages/Services";
import SignUp from "./components/pages/SignUp";
import { Success } from "./components/pages/SuccessInquiry";
import Signin from "./components/pages/Signin";
import Inquiry from "./components/pages/Inquiry";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/services" exact component={Services} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/signin" exact component={Signin} />
          <Route path="/success" exact component={Success} />
          <Route path="/inquiry" exact component={Inquiry} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
