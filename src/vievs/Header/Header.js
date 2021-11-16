import { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteCoockie } from "../../helpers/session";

import SelectButton from "../../components/Buttons/SelectButton/SelectButton";
import LoginForm from "../LoginForm/LoginForm";
import Menu from "../../vievs/Menu/Menu";
import TestMenu from "../../vievs/TestMenu/TestMenu";

import { StoreContext } from "../../Store/StoreProvider";

import styles from "./Header.module.scss";

function Header() {
  let history = useHistory();
  const {
    loginModalOpen,
    setLoginModalOpen,
    user,
    setUser,
    cookie,
    setCookie,
  } = useContext(StoreContext);

  const [testState, setTestState] = useState(false);

  const handleChangeTestState = () => {
    setTestState(true);
  };

  const testOrMenuButton = () => {
    if (!cookie) {
      if (!testState) {
        return (
          <Link to={"/test-form"}>
            <SelectButton name={"testuj"} onClick={handleChangeTestState} />
          </Link>
        );
      } else {
        return <TestMenu />;
      }
    } else return "";
  };

  // useEffect(() => {
  //   checkTestCookie();
  // }, []);

  const buttonName = !user && !cookie ? "logowanie" : "wyloguj";

  const menuItem = !user && !cookie ? "" : <Menu />;

  const handleLoginLogout = () => {
    if (!user && !cookie) {
      setLoginModalOpen(true);
    }
    setUser(false);
    deleteCoockie(cookie);
    setCookie(false);
    history.push("./");
  };

  const handleCloseModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <div className={styles.wrapper}>
      <h1>Zlecenia on-line</h1>
      <div className={styles.buttons}>
        <div className={styles.loginAppBtn}>
          <SelectButton name={buttonName} onClick={handleLoginLogout} />
          <LoginForm
            isModalOpen={loginModalOpen}
            handleCloseModal={handleCloseModal}
          />
        </div>
        {testOrMenuButton()}
        <div className={styles.menuItems}>{menuItem}</div>
        <div className={styles.testAppBtn}></div>
      </div>
    </div>
  );
}

export default Header;
