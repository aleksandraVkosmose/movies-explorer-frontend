import React from 'react';
import AboutProject from '../AboutProject/AboutProject';
import Promo from '../Promo/Promo';
import NavBar from '../NavBar/NavBar';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Main() {
  return (
    <>
      <Header />
      <main className="main">
        <Promo />
        <NavBar />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  )
}
export default Main;