import { useContext, useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import request from "../../helpers/request";

import Spinner from "../../components/Spinner/Spinner";

import { StoreContext } from "../../Store/StoreProvider";

import styles from "./LoginForm.module.scss";

const LoginForm = (props) => {
  const { setUser, showSpinner, setShowSpinner } = useContext(StoreContext);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [validateMessage, setValidateMessage] = useState("");

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
    const { data, status } = await request.post("/users", { login, password });

    if (status === 200) {
      setShowSpinner(false);
      setUser(data.user);
      resetStateOfInput();
      props.handleCloseModal();
    } else {
      setValidateMessage(data.message);
      setShowSpinner(false);
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
        {validateMessageComponent}
        <form className={styles.form} method="post" onSubmit={handleOnSubmit}>
          <div className={styles.login}>
            <label>
              Login:
              <input onChange={handleOnChangeLogin} type="text" value={login} />
            </label>
          </div>
          <div className={styles.password}>
            <label>
              Hasło:
              <input
                onChange={handleOnChangePassword}
                type="password"
                value={password}
              />
            </label>
          </div>
          <div className={styles.buttons}>
            <button type="submit">Zaloguj</button>
            <button onClick={handleOnCloseModal} type="button">
              Wyjdź
            </button>
          </div>
        </form>
      </div>
      {spinner}
    </Modal>
  );
};

export default LoginForm;
