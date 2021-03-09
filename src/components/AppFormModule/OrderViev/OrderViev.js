import Modal from "../../Modal/Modal";
import MainButton from "../../Buttons/MainButton/MainButton";

import styles from "./OrderViev.module.scss";

const OrderViev = (props) => {
  const { companyName, companyAdress, vatNo } = props.vievClient;

  const {
    loadDate,
    loadHrs,
    loadAdress,
    loadCountry,
    loadZip,
    loadCity,
    unloadDate,
    unloadHrs,
    unloadAdress,
    unloadCountry,
    unloadZip,
    unloadCity,
    goodsSpecification,
    driver,
    truck,
    notes,
    adr,
    fix,
  } = props.orderObject;

  const OrderInformation = (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.client}>
          <p>{companyName}</p>
          <p>{companyAdress}</p>
          <p>{vatNo}</p>
        </div>
        <div className={styles.carrier}>
          <p>{props.vievCarrier.companyName}</p>
          <p>{props.vievCarrier.companyAdress}</p>
          <p>{props.vievCarrier.vatNo}</p>
        </div>
        <h2>Zlecenie transportowe nr: {}</h2>
      </div>
      <div className={styles.order}>
        <div className={styles.load}>
          <h3>Załadunek</h3>
          <div className={styles.date}>
            <p>{!loadDate ? "" : loadDate}</p>
            <p>godz: {!loadHrs ? "" : loadHrs}</p>
          </div>
          <div className={styles.place}>
            <p>{!loadCountry ? "" : loadCountry}</p>
            <p>{!loadZip ? "" : loadZip}</p>
            <p>{!loadCity ? "" : loadCity}</p>
            <p>{!loadAdress ? "" : loadAdress}</p>
          </div>
        </div>
        <div className={styles.unload}>
          <h3>Rozładunek</h3>
          <div className={styles.date}>
            <p>{!unloadDate ? "" : unloadDate}</p>
            <p>godz: {!unloadHrs ? "" : unloadHrs}</p>
          </div>
          <div className={styles.place}>
            <p>{!unloadCountry ? "" : unloadCountry}</p>
            <p>{!unloadZip ? "" : unloadZip}</p>
            <p>{!unloadCity ? "" : unloadCity}</p>
            <p>{!unloadAdress ? "" : unloadAdress}</p>
          </div>
        </div>
        <div className={styles.cargo}>
          <h3>Dane zlecenia</h3>
          <div>
            <p>{!goodsSpecification ? "" : goodsSpecification}</p>
            <p>kierowca: {!driver ? "" : driver}</p>
            <p>pojazd: {!truck ? "" : truck}</p>
            <p>uwagi: {!notes ? "" : notes}</p>
            <p>ADR: {!adr ? "brak" : adr[0]}</p>
            <p>Fix: {!fix ? "brak" : fix[0]}</p>
          </div>
          <p></p>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      handleOnCloseModal={props.handleOnClose}
      isModalOpen={props.isModalOpen}
    >
      {OrderInformation}
      <div className={styles.button}>
        <MainButton name="wyjdź" onClick={props.handleOnClose} />
      </div>
    </Modal>
  );
};

export default OrderViev;
