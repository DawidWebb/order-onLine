import { Link } from "react-router-dom";
import MainButton from "../../components/Buttons/MainButton/MainButton";
import styles from "./LoggedMenu.module.scss";

const LoggedMenu = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <Link to="/orders">
          <MainButton name="zlecenia" />
        </Link>
        <Link to="/customers">
          <MainButton name="klienci" />
        </Link>
      </div>
    </div>
  );
};

export default LoggedMenu;
