import Header from '../header/Header';
import Navigation from '../navigation/Navigation';
import Promo from './promo/Promo';
import AboutProject from './aboutProject/AboutProject';
import Techs from './techs/Techs';
import AboutMe from './aboutMe/AboutMe';
import Portfolio from './portfolio/Portfolio';
import Footer from '../footer/Footer';


function Main() {
  return (
    <div className="main">
      <div className="main__content">
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </div>
    </div>
  );
}

export default Main;
