import React, { useContext, useEffect, useState } from "react";
import usePost from "../../Hooks/UsePost";
import { LoginContext } from "../../Context/LoginContext.jsx";
import API_URL from "../../../config.js";
import './ChangePassword.css'

const ChangePassword = () => {
    /*QUITAR LO QUE NO SEA NECESARIO YA QUE OCUPE LA PLANTILLA DEL DE REGISTER*/
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [message, setMessage] = useState("");
    const [isValid, setIsValid] = useState(false);

    const { postData, error, loading } = usePost(`${API_URL}/user/register`);
    const { user, handleRegister, handleSaveID } = useContext(LoginContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsValid(false);
        setMessage("");

        if (password !== confirm) {
            setIsValid(!isValid);
            return;
        }

        const userRegister = await postData("register", {
            username: username,
            email: email,
            password: password,
        });

        if (error || !userRegister) {
            if (error.error && Array.isArray(error.error)) {
                error.error.forEach((err) => {
                    console.log("Error: ", err.msg);
                });
            } else {
                console.log("Registro fallido: ", error.message);
            }

            return;
        }

        setMessage(userRegister.message);
        handleRegister(userRegister.data);
        handleSaveID(userRegister.data._id);

        console.log("Registro exitoso: ", userRegister.message);
        console.log("Objeto de usuario registrado: ", userRegister.data);
        console.log("ID de usuario registrado: ", userRegister.data._id);
    };

    useEffect(() => {
        if (user)
            console.log("Usuario registrado: ", user.username);
    }, [user]);

    return (
        <form className="formContainer-change" onSubmit={handleSubmit}>
            <div className="headerWrapper-change">
                <div><img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3031ae1a0ef5122343cfc046a0fe7378694ac59107f049ac12acaeaba50c1463?placeholderIfAbsent=true&apiKey=dc5b04b1bd644122995a9f89f3c5e2ef"
                    className="logo-change"
                    alt="Company logo"
                /></div>
                <div><h1 className="title-change">Recuperar contraseña</h1></div>
            </div>
            <div className="formsfields-change">
                <div className="formField-change">
                    <label htmlFor="email" className="formLabel-change">
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        className="formInput-change"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                    />
                </div>

                <div className="formField-change">
                    <label htmlFor="password" className="formLabel-change">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="formInput-change"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                </div>

                <div className="formField-change">
                    <label htmlFor="confirmPassword" className="formLabel-change">
                        Ingresa de nuevo la contraseña
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        className="formInput-change"
                        value={confirm}
                        onChange={(event) => setConfirm(event.target.value)}
                        required
                    />
                </div>

                <div className="formField-change">
                    <input
                        type="hidden"
                        id="token"
                        className="formInput-change"
                        required
                    />
                </div>
            </div>


            <div className="socialLoginContainer-change">
                <button type="submit" className="button google" disabled={loading}>
                    {loading ? "Recuperando..." : "Recuperar contraseña"}
                </button>
            </div>

            {message && <p style={{ color: "green" }}>{message}</p>}

            {error && error.message && (
                <p style={{ color: "red" }}>{error.message}</p>
            )}

            {error && error.error && (
                <div>
                    {error.error.map((err, index) => (
                        <p key={index} style={{ color: "red" }}>
                            {"Error: " + err.msg}
                        </p>
                    ))}
                </div>
            )}

            {isValid && (
                <p style={{ color: "red" }}>Las contraseñas ingresadas no coinciden</p>
            )}
        </form>
    );
};

export default ChangePassword;
