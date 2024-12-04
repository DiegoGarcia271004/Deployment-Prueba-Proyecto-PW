import React, { useContext, useEffect, useState } from "react";
import "./LoginPage.css";
import usePost from "../../Hooks/UsePost";
import { LoginContext, LoginProvider } from "../../Context/LoginContext.jsx";
import config from "../../../config.js";
import { NavLink, redirect } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
import useUtil from "../../Hooks/useUtil.jsx";

const LoginFormProvider = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const [message, setMessage] = useState("");
  const [yes, setYes] = useState(true);
  const [showButton, setShowButton] = useState(false);

  const { verifyRole } = useUtil();

  // useEffect(async () => {
  //   await verifyRole(email);
  // }, [email]);

  const { authentication: login, error: errorLogin, loading: loadingLogin } = usePost(
    `${config.API_URL}/${localStorage.getItem('verify')}/login`
  );

  const { handleLogin, handleSaveID, handleSaveRole } =
    useContext(LoginContext);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleForgotPasswordClick = () => {
    setShowButton(true);
  };

  const handleSubmit = async (event) => {
    setMessage("");
    setYes(true);
    event.preventDefault();

    await verifyRole(email);

    const userLogin = await login({ email, password });

    if (errorLogin || !userLogin) {
      return;
    }

    setMessage(userLogin.message);

    if (localStorage.getItem("verify") === "admin") {

      handleLogin(userLogin.data.admin, userLogin.data.token);
      handleSaveRole(userLogin.data.admin.role);
      handleSaveID(userLogin.data.admin.id);
      window.location.href = '/profile';

    } else {

      handleLogin(userLogin.data.user, userLogin.data.token);
      handleSaveRole(userLogin.data.user.role);
      handleSaveID(userLogin.data.user.id);
      window.location.href = "/admin";
    }
    localStorage.removeItem('verify');
  };

  return (
    <form className="formContainer" onSubmit={handleSubmit}>
      <header className="headerWrapper">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3031ae1a0ef5122343cfc046a0fe7378694ac59107f049ac12acaeaba50c1463?placeholderIfAbsent=true&apiKey=dc5b04b1bd644122995a9f89f3c5e2ef"
          className="logo"
          alt="Company logo"
        />
        <h1 className="title">Iniciar sesion</h1>
      </header>

      <div className="formField">
        <label htmlFor="username" className="formLabel">
          Correo
        </label>
        <input
          type="text"
          id="username"
          className="formInput"
          value={email}
          onChange={handleChangeEmail}
          required
        />
      </div>

      <div className="formField">
        <label htmlFor="password" className="formLabel">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          className="formInput"
          value={password}
          onChange={handleChangePassword}
          required
        />
      </div>
      <div className="forgot-password">
        <span
          className="forgot-password-text"
          onClick={handleForgotPasswordClick}
        >
          ¿Olvidaste tu contraseña?
        </span>
        {showButton && (
          <NavLink to={'/recovery'} onClick={() => localStorage.setItem('isRecovery', true)}>
            <button type="button" className="reset-password-button">
              Recuperar contraseña
            </button>
          </NavLink>
        )}
      </div>
      <div className="socialLoginContainer">
        <button type="submit" className=" button google" disabled={loadingLogin}>
          {loadingLogin ? "Iniciando sesion..." : "Iniciar sesion"}
        </button>
        <button class="button google">
          <svg
            viewBox="0 0 256 262"
            preserveAspectRatio="xMidYMid"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              fill="#4285F4"
            ></path>
            <path
              d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              fill="#34A853"
            ></path>
            <path
              d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
              fill="#FBBC05"
            ></path>
            <path
              d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              fill="#EB4335"
            ></path>
          </svg>
          Iniciar sesión con Google
        </button>
      </div>
      {message && <p style={{  color: yes ? 'green' : 'red' }}>{message}</p>}
      {errorLogin && <p style={{ color: "red" }}>{errorLogin}</p>}
    </form>
  );
};

export const LoginForm = () => {
  return (
    <>
      <LoginProvider>
        <LoginFormProvider />
      </LoginProvider>
    </>
  );
};
