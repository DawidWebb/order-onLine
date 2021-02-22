import { Link } from "react-router-dom";
import SelectButton from "../../components/Buttons/SelectButton/SelectButton";
import styles from "./LoggedMenu.module.scss";

const LoggedMenu = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <Link to="/orders">
          <SelectButton name="zlecenia" />
        </Link>
        <Link to="/customers">
          <SelectButton name="klienci" />
        </Link>
      </div>
    </div>
  );
};

export default LoggedMenu;
