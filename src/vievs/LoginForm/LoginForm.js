import { useContext, useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import request from "../../helpers/request";
import { addCookie } from "../../helpers/session";
import MainButton from "../../components/Buttons/MainButton/MainButton";
import Spinner from "../../components/Spinner/Spinner";

import { StoreContext } from "../../Store/StoreProvider";

import styles from "./loginForm.module.scss";

const LoginForm = (props) => {
  const { setUser, setCookie } = useContext(StoreContext);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [validateMessage, setValidateMessage] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  const handleOnChangeLogin = (event) => setLogin(event.target.value);
  const handleOnChangePassword = (event) => setPassword(event.target.value);
  const handleOnCloseModal = (event) => {
    event.preventDefault();
    props.handleCloseModal();
  };

  const resetStateOfInput = () => {
    setLogin("");
    setPassword("");
    setValidateMessage("");
  };

  const spinner = showSpinner ? <Spinner /> : "";

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setShowSpinner(true);
    const { data, status } = await request.post("/users", {
      login,
      password,
    });

    if (status === 200) {
      setShowSpinner(false);
      setUser(data.user);
      resetStateOfInput();
      props.handleCloseModal();
      addCookie();
      setCookie("appFormAdmin");
    } else {
      setValidateMessage(data.message);
      setShowSpinner(false);
      console.log(data.message);
    }
  };

  useEffect(() => {
    if (props.isModalOpen) {
      resetStateOfInput();
    }
  }, [props.isModalOpen]);

  const validateMessageComponent = validateMessage.length ? (
    <p className={styles.validateMessage}>{validateMessage}</p>
  ) : null;

  return (
    <Modal
      isModalOpen={props.isModalOpen}
      handleOnCloseModal={props.handleCloseModal}
    >
      <div className={styles.wrapper}>
        <div className={styles.infromation}>{validateMessageComponent}</div>
        <form className={styles.form} method="post" onSubmit={handleOnSubmit}>
          <div className={styles.login}>
            <input
              className={styles.input}
              onChange={handleOnChangeLogin}
              type="text"
              value={login}
              placeholder="Login"
            />
          </div>
          <div className={styles.password}>
            <input
              className={styles.input}
              onChange={handleOnChangePassword}
              type="password"
              value={password}
              placeholder="Hasło"
            />
          </div>
          <div className={styles.buttons}>
            <MainButton type="submit" name="zaloguj" />
            <MainButton
              type="button"
              name="wyjdź"
              onClick={handleOnCloseModal}
            />
          </div>
        </form>
        <div className={styles.spinnerWrapper}>{spinner}</div>
      </div>
    </Modal>
  );
};

export default LoginForm;
