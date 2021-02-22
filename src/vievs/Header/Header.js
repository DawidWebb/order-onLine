import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Store/StoreProvider";

import SelectButton from "../../components/Buttons/SelectButton/SelectButton";
import LoginForm from "../LoginForm/LoginForm";

import styles from "./Header.module.scss";

function Header() {
  const { loginModalOpen, setLoginModalOpen, user, setUser } = useContext(
    StoreContext
  );

  const buttonName = !user ? "logowanie" : "wyloguj";

  const handleLoginLogout = () => {
    if (!user) {
      setLoginModalOpen(true);
    }
    setUser(false);
  };

  const handleCloseModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1>Zlecenia on-line</h1>
      <div className={styles.buttons}>
        <div className={styles.loginAppBtn}>
          <SelectButton name={buttonName} onClick={handleLoginLogout} />
          <LoginForm
            isModalOpen={loginModalOpen}
            handleCloseModal={handleCloseModal}
          />
        </div>
        <div className={styles.testAppBtn}>
          {!user ? (
            <Link to={"/test-form"}>
              <SelectButton name={"testuj"} />
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
