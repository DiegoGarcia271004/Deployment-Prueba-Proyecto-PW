import React from "react";
import Card from "../../components/Card/Card";
import "../Profile/ProfileLayout.css";
import { redirect } from "react-router-dom";

const cards = [
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNVR6QMd3PBAU8yoWl8nlLKYoMOTF7zqH_bQ&s",
    title: "Administrar Usuarios",
    description: "Administra los usuarios de la página web",
    redirect: "/admin/users",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOsbNuCo9YMBkKk4khUq3XdI2dDZhpLrh2rA&s",
    title: "Administrar Consultores",
    description: "Small and Concise headline",
    redirect: "/admin/consultants",
  },
  {
    image:
      "https://codideep.com/img/blogpost/imagenportada/202003020000001.png",
      title: "Administrar Preguntas",
      description: "Administra las preguntas que se les muestra a los usuarios",
      redirect: "/admin/formPage"
  },
];

export const AdminMenuLayout = () => {
  return (
    <main className="profileContainer">
      {}
      <section className="profileHeader">
        <div className="headerBackground" />
        <div className="headerContent">
          <button className="changePhotoButton">Cambiar foto</button>
        </div>
      </section>

      {}
      <div className="mainContent">
        <section className="cardsSection">
          <div className="cardsGrid">
            {cards.map((card, index) => (
              <Card key={index} {...card} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
