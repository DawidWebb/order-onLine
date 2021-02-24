import { useContext } from "react";

import WelcomeSite from "../WelcomeSite/WelcomeSite";
import LoggedMenu from "../LoggedMenu/LoggedMenu";

import { StoreContext } from "../../Store/StoreProvider";
import styles from "./MainSection.module.scss";

function MainSection() {
  const { user, cookie } = useContext(StoreContext);
  console.log(cookie);
  const mainViev = user || cookie ? <LoggedMenu /> : <WelcomeSite />;
  return <div className={styles.wrapper}>{mainViev}</div>;
}

export default MainSection;
