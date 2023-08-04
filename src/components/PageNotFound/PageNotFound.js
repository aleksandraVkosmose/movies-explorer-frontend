import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {

  const navigate = useNavigate();

  function handleClickBack() {
    navigate(-1);
  }
  return (
    <main className="main">
    <section className="not-found">
      <span className="not-found__number">404</span>
      <h3 className="not-found__title">Страница не найдена</h3>
      <button className="not-found__back" onClick={handleClickBack}>
        Назад
      </button>
    </section>
    </main>
  );
}

export default PageNotFound;