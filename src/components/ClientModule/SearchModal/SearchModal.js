import { useEffect, useState, useContext } from "react";
import Modal from "../../Modal/Modal";
import MainButton from "../../Buttons/MainButton/MainButton";
import Spinner from "../../Spinner/Spinner";

import request from "../../../helpers/request";
import { StoreContext } from "../../../Store/StoreProvider";

import styles from "./SearchModal.module.scss";

const SearchModal = (props) => {
  const { setSerchedClient, user, cookie } = useContext(StoreContext);

  const [vatNo, setVatNo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [validateMessage, setValidateMessage] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

  const handleOnChangeVat = (event) => setVatNo(event.target.value);
  const handleOnChangeName = (event) => setCompanyName(event.target.value);

  const handleOnCloseModal = (event) => {
    event.preventDefault();
    props.handleCloseModal();
  };

  const resetStateOfInput = () => {
    setVatNo("");
    setCompanyName("");
    setValidateMessage("");
  };

  const spinner = showSpinner ? <Spinner /> : "";

  // get client by vat
  const handleOnSubmitByVat = async (event) => {
    event.preventDefault();
    setShowSpinner(true);
    if (user || cookie) {
      const { data, status } = await request.get(`/clients/${vatNo}`);

      if (status === 200) {
        setSerchedClient(data.client);
        console.log(data.client);
        resetStateOfInput();
        props.handleCloseModal();
        setShowSpinner(false);
      } else {
        setValidateMessage(data.message);
        setShowSpinner(false);
      }
    } else {
      console.log("search by VAT");
      setShowSpinner(false);
    }
  };
  // get client by name
  const handleOnSubmitByName = async (event) => {
    event.preventDefault();
    setShowSpinner(true);
    if (user || cookie) {
      const { data, status } = await request.get(
        `/clients/name/${companyName}`
      );

      if (status === 200) {
        setSerchedClient(data.client);
        resetStateOfInput();
        props.handleCloseModal();
        setShowSpinner(false);
      } else {
        setValidateMessage(data.message);
        setShowSpinner(false);
      }
    } else {
      console.log("search by name");
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
        <form
          className={styles.form}
          method="get"
          onSubmit={handleOnSubmitByVat}
        >
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
          </div>
        </form>
        <form
          className={styles.form}
          method="get"
          onSubmit={handleOnSubmitByName}
        >
          <div className={styles.search}>
            <input
              onChange={handleOnChangeName}
              type="text"
              value={companyName}
              placeholder="podaj nazwę klienta"
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
