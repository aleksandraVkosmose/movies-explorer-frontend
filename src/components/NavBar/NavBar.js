import React from 'react';

function NavBar({ handleButtonClick }) {
  return (
    <nav className='navBar'>
      <div className="container navBar__container">
      <ul className="navBar__list">
        <li className='navBar__list-item' onClick={handleButtonClick} name="aboutProject">О проекте</li>
        <li className='navBar__list-item' onClick={handleButtonClick} name="techs" >Технологии</li>
        <li className='navBar__list-item' onClick={handleButtonClick} name="student">Студент</li>
      </ul>
      </div>
    </nav>
  )
}
export default NavBar;