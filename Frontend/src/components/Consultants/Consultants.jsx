import axios from "axios";
import "./Consultants.css";
import { React, useContext, useEffect, useState } from "react";
import useFetch from "../../Hooks/UseFetch";
import config from "../../../config";
import { FetchContext, FetchProvider } from "../../Context/FetchContext";
import { LoginContext, LoginProvider } from "../../Context/LoginContext";
import { redirect } from "react-router-dom";
import Unauthorized from "../Unauthorized/Unauthorized";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { NavLink } from "react-router-dom";

const ConsultantsProvider = () => {

  const { user, token, role, updateUserField } = useContext(LoginContext);
  const { consultants, handleFetchConsultants } = useContext(FetchContext); 
  const { data, error, loading } = useFetch(`${config.API_URL}/consultant/`, token, role);
  const [idConsultant, setID] = useState(null);

  const params = new URLSearchParams(window.location.search);
  const _token = params.get("token");
  const confirmationUrl = params.get("confirmation");
  const PPUser = params.get("user");
  const PPPsw = params.get("psw");

  useEffect(() => {
    if (error) {
      console.error(error);
      return;
    }

    if (data) {
      handleFetchConsultants(
        data.consultants[0]?.consultants,
        data.consultants[0]._id
      );
    }
  }, [data, error]);

  /**
   * Función encargada de realizar el pago de los
   * @param {Number} price Recibe el precio como un objeto
   */
  const payServices = async (price, id) => {
    try {
      setID(id);
      //TODO aqui antes de realizar toda la logica del pago se debe verificar que no hay un consultor contratado
      const response = await axios.post(
        "http://localhost:3000/api/payment/create-order", //FIXME Enviar en forma de variable de entorno, no lo dejen aca
        { price }, // Enviar como objeto JSON
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      window.location.href = data.links[1].href;
    } catch (error) {
      console.error("Error al realizar el pago:", error.message);
      console.error(error);
    }
  };

  // Resetear la URL sin parámetros
  useEffect(() => {
    window.history.pushState({}, "", window.location.pathname); // Cambia la URL eliminando los parámetros
  }, []);

  const confirmPayment = async (token) => {
    const response = await axios.post(
      `${confirmationUrl}/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: PPUser,
          password: PPPsw,
        },
      }
    );

    if (response.data.status === "COMPLETED") {
      console.log("El pago se realizo con exito");
      updateUserField("contract", {
        contract: true,
        consultant: idConsultant
      });
    } else {
      console.log("No se pudo realizar el pago");
    }
  };

  useEffect(() => {
    if (_token) {
      confirmPayment(_token);
    }
  }, [_token]); // Se ejecuta cuando `token` cambia

  if (role !== 'user') return <Unauthorized/> //TODO Diego pone aqui el footer y lo demas

  if (error) {
    return (
      <>
        <p>{error}</p>
      </>
    );
  }

  if (loading) return <p>Extrayendo datos de consultores...</p>;

  if (error) return <p>{error}</p>

  if (!consultants || consultants.length === 0)
    return <p>No hay consultores disponibles...</p>;

  return (
    <>
      <div className="consultants-list">
        {Array.isArray(consultants) ? consultants.map((consultant) => (
          <div key={consultant._id} className="consultant-card">
            <h3>{consultant.username}</h3>
            {/*FIXME Cambiar que amenos que el consultor esté contratado se mostrará el email */}
            {user.contract.contract ? <p>Correo electrónico: {consultant.email}</p> : ""}
            <p>Precio de contratación: ${consultant.price}</p>
            <PayPalScriptProvider >
                  <PayPalButtons onClick={() => payServices(consultant.price, consultant._id)}
                    style={{
                      shape: "rect",
                      layout: "vertical",
                      color: "gold",
                      label: "pay",
                    }}
                  >
                    {/*FIXME Gabo, revisa esto y cambialo*/}
                    {/*-> {user.contract.contract && user.contract.consultant === consultant._id ? "Contratado" : `Contratar a ${consultant.username}`} */}
                    </PayPalButtons>
            </PayPalScriptProvider>
          </div>
        )) : <p>No hay consultores disponibles...</p>}
        
        <p className="p">
          <NavLink
            to={"/profile"}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            ← Regresar
          </NavLink>
        </p>
      </div>
    </>
  );
};

const Consultants = () => {
  return (
    <>
      <LoginProvider>
        <FetchProvider>
          <ConsultantsProvider />
        </FetchProvider>
      </LoginProvider>
    </>
  );
};

export default Consultants;
