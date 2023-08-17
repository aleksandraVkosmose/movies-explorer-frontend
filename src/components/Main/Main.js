import React from 'react';
import AboutProject from '../AboutProject/AboutProject';
import Promo from '../Promo/Promo';
import NavBar from '../NavBar/NavBar';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useRef } from "react"

function Main() {
  const refs = {
    aboutProject: useRef(null),
    techs: useRef(null),
    student: useRef(null),
  };

  function handleButtonClick(e) {
    const name = e.target.attributes.name.value;
    const element = refs[name].current;
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <>
      <Header />
      <main className="main">
        <Promo />
        <NavBar handleButtonClick={handleButtonClick} />
        <AboutProject ref={refs.aboutProject}/>
        <Techs ref={refs.techs} />
        <AboutMe ref={refs.student}/>
        <Portfolio />
      </main>
      <Footer />
    </>
  )
}
export default Main;