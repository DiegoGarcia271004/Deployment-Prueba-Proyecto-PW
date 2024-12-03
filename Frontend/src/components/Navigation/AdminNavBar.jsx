import React, { useContext, useState } from "react";
import { FaBars } from "react-icons/fa";
import "./AdminNavBar.css";
import { LoginContext, LoginProvider } from "../../Context/LoginContext";
import logoblanco from '../../assets/logoblanco.svg';
import { Link } from 'react-router-dom';
import './AdminNavBar.css';

const AdminNavBarProvider = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { logout } = useContext(LoginContext);

  const handleLogout = () => {


    window.location.href = "/"
  }

  return (
    <nav className="navbar-admin">
      <div className="navbar-logo">
        <img src={logoblanco} alt="Logo" />
      </div>

      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <Link to="/admin">Inicio</Link>
        </li>
        <li>
          <Link to="/admin/users">Usuarios</Link>
        </li>
        <li>
          <Link to="/admin/consultants">Consultores</Link>
        </li>
        <li>
          <Link to="admin/formPage">Formularios</Link>
        </li>
        <li>
          <Link to="/admin/checklistPage">Checklists</Link>
        </li>
      </ul>

        {/* esto lo vamos a cambiar por la imagen del admin? -Ño*/}
        {/* <div className="profile-icon">
          <span onClick={logout}>👤</span> */}
      <div className="navbar-icons">
        <div className="navbar-user">
          <span className="material-icons">person</span>
        </div>
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

const AdminNavBar = () => {
  return (
    <>
      <LoginProvider>
        <AdminNavBarProvider/>
      </LoginProvider>
    </>
  )
}

export default AdminNavBar;
