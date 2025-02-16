import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = (props) => {
  let location = useLocation();
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("emailid");
    navigate("/login");
    props.showAlert("User LoggedOut ", "success");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex" role="search">
              <Link className="btn btn-primary mx-1" role="button" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary mx-1" role="button" to="/signup">
                SignUp
              </Link>
            </form>
          ) : (
            <>
              <span
                className="mx-2"
                style={{ color: "white", fontStyle: "Italic", opacity: 0.6 }}
              >
                {localStorage.getItem("emailid")}
              </span>
              <span className="mx-2">
                <FaUserCircle size={30} color="white" />
              </span>
              <button className="btn btn-primary mx-2" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
