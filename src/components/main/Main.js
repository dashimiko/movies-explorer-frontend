import Header from '../header/Header';
import Promo from '../promo/Promo';
import AboutProject from '../aboutProject/AboutProject';
import Techs from '../techs/Techs';
import AboutMe from '../aboutMe/AboutMe';
import Portfolio from '../portfolio/Portfolio';
import Footer from '../footer/Footer'

function Main({isEntrance,isBurgerOpen,onBurgerClick}) {
  return (
    <div className="main">
      <div className="main__content">
        <Header isEntrance={isEntrance} isBurgerOpen={isBurgerOpen} onBurgerClick={onBurgerClick}/>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
        <Footer/>
      </div>
    </div>
  );
}

export default Main;
