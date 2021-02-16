import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../../Store/StoreProvider";

import SelectButton from "../../components/Buttons/SelectButton/SelectButton";
import LoginForm from "../LoginForm/LoginForm";
import styles from "./MainSection.module.scss";

function MainSection() {
  const { loginModalOpen, setLoginModalOpen } = useContext(StoreContext);

  const handleOpenLoginModal = () => {
    setLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setLoginModalOpen(false);
  };
  return (
    <div className={styles.container}>
      <div className={styles.loginApp}>
        <SelectButton name={"logowanie"} onClick={handleOpenLoginModal} />
        <LoginForm
          isModalOpen={loginModalOpen}
          handleCloseModal={handleCloseModal}
        />
      </div>
      <div className={styles.testApp}>
        <Link to={"/test-form"}>
          <SelectButton name={"testuj"} />
        </Link>
      </div>
    </div>
  );
}

export default MainSection;
