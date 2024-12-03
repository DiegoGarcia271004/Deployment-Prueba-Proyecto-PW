import logoblanco from "../../assets/logoblanco.svg";
import React, { useContext, useState } from "react";
import "./UserNavBar.css";
import { NavLink } from "react-router-dom";
import useUpdate from "../../Hooks/UseUpdate";
import { LoginContext, LoginProvider } from "../../Context/LoginContext";
import config from "../../../config";

const UserNavBarProvider = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { user, token, role, logout } = useContext(LoginContext);
  const { updateData, error, loading } = useUpdate(
    `${config.API_URL}/user/update`
  );

  const handleLogout = async () => {
    const body = {
      checklist: user.checklist,
      form: user.form,
      contract: user.contract,
    };

    const response = await updateData(
      sessionStorage.getItem("id"),
      body,
      token,
      role
    );

    if (error || !response) {
      console.log(error);
      return;
    }
    console.log(response.message);
    logout();
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/"
  };

  return (
    <nav className="navbar">
      <NavLink to="/">
        <div className="navbar-logo">
          <img src={logoblanco} alt="Logo" />
        </div>
      </NavLink>

      <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        <NavLink to={"/requirements"}>
          <a href="#">Requerimientos</a>
        </NavLink>
        {/*TODO Cambiar a la form dinámica */}
        <NavLink to={"/form"}>
          <a href="#">Ficha</a>
        </NavLink>
        <NavLink to={"/consultants"}>
          <a href="#">Consultores</a>
        </NavLink>
        <NavLink to={"/"}>
          <a href="#">Recursos</a>
        </NavLink>
      </div>

      <div className="navbar-icons">
        <NavLink to={"/profile"}>
          <span className="material-icons">person</span>
        </NavLink>

        <span className="material-icons" onClick={handleLogout}>
          exit_to_app
        </span>
      </div>

      <div className="navbar-toggle" onClick={toggleMenu}>
        <span className="material-icons">menu</span>
      </div>
    </nav>
  );
};

const UserNavBar = () => {
  return (
    <>
      <LoginProvider>
        <UserNavBarProvider />
      </LoginProvider>
    </>
  );
};

export default UserNavBar;
