import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Store/StoreProvider";

import SelectButton from "../../components/Buttons/SelectButton/SelectButton";
import LoginForm from "../LoginForm/LoginForm";

import styles from "./Header.module.scss";

function Header() {
  const { loginModalOpen, setLoginModalOpen, user } = useContext(StoreContext);

  console.log(user);
  const handleOpenLoginModal = () => {
    setLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <h1>Header - Welcome</h1>
      <div className={styles.buttons}>
        <div className={styles.loginAppBtn}>
          <SelectButton name={"logowanie"} onClick={handleOpenLoginModal} />
          <LoginForm
            isModalOpen={loginModalOpen}
            handleCloseModal={handleCloseModal}
          />
        </div>
        <div className={styles.testAppBtn}>
          <Link to={"/test-form"}>
            <SelectButton name={"testuj"} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
