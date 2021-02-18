import { useContext } from "react";
import { StoreContext } from "../../Store/StoreProvider";

import WelcomeSite from "../WelcomeSite/WelcomeSite";
import LoggedMenu from "../LoggedMenu/LoggedMenu";

import styles from "./MainSection.module.scss";

function MainSection() {
  const { user } = useContext(StoreContext);

  const mainViev = user ? <LoggedMenu /> : <WelcomeSite />;
  return <>{mainViev}</>;
}

export default MainSection;
