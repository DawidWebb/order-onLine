import { useContext, useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import MainButton from "../../components/Buttons/MainButton/MainButton";
import Spinner from "../../components/Spinner/Spinner";

import request from "../../helpers/request";
import { StoreContext } from "../../Store/StoreProvider";

import styles from "./SearchModal.module.scss";

const SearchModal = (props) => {
  const { showSpinner, setShowSpinner } = useContext(StoreContext);

  const [vatNo, setVatNo] = useState("");
  const [validateMessage, setValidateMessage] = useState("");

  const handleOnChangeVat = (event) => setVatNo(event.target.value);

  const handleOnCloseModal = (event) => {
    event.preventDefault();
    props.handleCloseModal();
  };

  const resetStateOfInput = () => {
    setVatNo("");
    setValidateMessage("");
  };

  const spinner = showSpinner ? <Spinner /> : "";

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setShowSpinner(true);
    const { data, status } = await request.get(`/clients/${vatNo}`);

    if (status === 200) {
      setShowSpinner(false);
      console.log(data);
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
        <div className={styles.infromation}>{validateMessageComponent}</div>
        <form className={styles.form} method="get" onSubmit={handleOnSubmit}>
          <div className={styles.search}>
            <input
              onChange={handleOnChangeVat}
              type="text"
              value={vatNo}
              placeholder="podaj nip klienta"
            />
          </div>

          <div className={styles.buttons}>
            <MainButton type="submit" name="wyszukaj" />
            <MainButton
              type="button"
              onClick={handleOnCloseModal}
              name="wyjdź"
            />
          </div>
        </form>
      </div>
      <div className={styles.spinnerWrapper}>{spinner}</div>
    </Modal>
  );
};

export default SearchModal;
