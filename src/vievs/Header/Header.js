import { useContext } from "react";
import { Link } from "react-router-dom";
import { deleteCoockie } from "../../helpers/session";

import SelectButton from "../../components/Buttons/SelectButton/SelectButton";
import LoginForm from "../LoginForm/LoginForm";

import { StoreContext } from "../../Store/StoreProvider";

import styles from "./Header.module.scss";

function Header() {
  const {
    loginModalOpen,
    setLoginModalOpen,
    user,
    setUser,
    cookie,
    setCookie,
  } = useContext(StoreContext);

  const buttonName = !user && !cookie ? "logowanie" : "wyloguj";

  const handleLoginLogout = () => {
    if (!user && !cookie) {
      setLoginModalOpen(true);
    }
    setUser(false);
    deleteCoockie(cookie);
    setCookie(false);
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
          {!cookie ? (
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
