import { Link } from "react-router-dom";
import { useRef, useContext } from "react";

import SelectButton from "../../components/Buttons/SelectButton/SelectButton";

import { StoreContext } from "../../Store/StoreProvider";

import styles from "./Menu.module.scss";

const links = [
  { name: "start", path: "/" },
  { name: "zlecenia", path: "/orders" },
  { name: "dodaj zlecenie", path: "/addorder" },
  { name: "pokaż zlecenia", path: "/showorders" },
  { name: "klienci", path: "/customers" },
];

const Menu = () => {
  const { setCopiedOrderData, setKindOfTask } = useContext(StoreContext);

  const openCloseMenuRef = useRef(null);
  const handleOpenMenu = () => {
    openCloseMenuRef.current.style.top = 0;
  };

  const handleCloseMenu = () => {
    openCloseMenuRef.current.style.top = "-125px";
    setCopiedOrderData();
    setKindOfTask(false);
  };

  const linkItem = links.map((item) => (
    <Link key={item.path} to={`${item.path}`} onClick={handleCloseMenu}>
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
