import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { isauthenticate, signOut } from "../util/function";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);

  const history = useHistory();
  let location = useLocation();

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {}, [location]);

  const signingOut = async () => {
    try {
      await signOut();
      // removing token from local storage
      localStorage.removeItem("jwt");
      closeMobileMenu();
      history.push("/");
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            TastyTreats
            <i className="fab fa-times" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/services"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/inquiry"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Inquiry
              </Link>
            </li>
            {!isauthenticate() && (
              <>
                {" "}
                <li className="nav-item">
                  <Link
                    to="/signin"
                    className="nav-links nav-user"
                    onClick={closeMobileMenu}
                  >
                    Signin
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/signup"
                    className="nav-links nav-user"
                    onClick={closeMobileMenu}
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
            {isauthenticate() && (
              <li className="nav-item">
                <Link
                  to="/signup"
                  className="nav-links nav-user"
                  onClick={signingOut}
                >
                  Signout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
