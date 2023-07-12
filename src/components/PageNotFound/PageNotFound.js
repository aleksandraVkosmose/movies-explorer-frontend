import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <section className="not-found">
      <span className="not-found__number">404</span>
      <h3 className="not-found__title">Страница не найдена</h3>
      <Link className="not-found__back" to="/">
        Назад
      </Link>
    </section>
  );
}

export default PageNotFound;