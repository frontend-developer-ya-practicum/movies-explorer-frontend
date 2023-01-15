import "./Main.css";

import AboutProject from "../AboutProject/AboutProject";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";

function Main() {
  return (
    <main className="content">
      <Promo />
      <AboutProject />
      <Techs />
    </main>
  );
}

export default Main;
