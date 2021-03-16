import { Link } from "react-router-dom";
import { useRef } from "react";

import SelectButton from "../../components/Buttons/SelectButton/SelectButton";

import styles from "./Menu.module.scss";

const links = [
  { name: "start", path: "/" },
  { name: "zlecenia", path: "/orders" },
  { name: "dodaj zlecenie", path: "/addorder" },
  { name: "pokaż zlecenia", path: "/showorders" },
  { name: "klienci", path: "/customers" },
];

const Menu = () => {
  const openCloseMenuRef = useRef(null);
  const handleOpenMenu = () => {
    openCloseMenuRef.current.style.top = 0;
  };

  const handleCloseMenu = () => {
    openCloseMenuRef.current.style.top = "-125px";
  };

  const linkItem = links.map((item) => (
    <Link to={`${item.path}`} onClick={handleCloseMenu}>
      {item.name}
    </Link>
  ));
  return (
    <>
      <div className={styles.menu}>
        <SelectButton name="menu" onClick={handleOpenMenu} />
      </div>
      <div className={styles.items} ref={openCloseMenuRef}>
        {linkItem}
        <SelectButton name="zamknij" onClick={handleCloseMenu} />
      </div>
    </>
  );
};

export default Menu;
