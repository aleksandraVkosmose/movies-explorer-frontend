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
    <main className="main">
      <Header />
      <Promo />
      <NavBar />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />
    </main>
  )
}
export default Main;