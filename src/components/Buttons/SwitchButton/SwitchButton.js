import { useContext, useState } from "react";

import { StoreContext } from "../../../Store/StoreProvider";

import styles from "./switchButton.module.scss";

function SwitchButton(props) {
  const { colorCookie, setColorCookie } = useContext(StoreContext);

  console.log(colorCookie);
  const handleChangeSiteColors = () => {
    if (!colorCookie) {
      setColorCookie("lightColor");
      localStorage.setItem(`lightColor`, JSON.stringify(colorCookie));
    } else {
      setColorCookie(false);
      localStorage.removeItem(`lightColor`);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.outside}>
        <div className={styles.inside} onClick={handleChangeSiteColors}></div>
      </div>
    </div>
  );
}

export default SwitchButton;
