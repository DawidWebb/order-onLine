import Modal from "../../components/Modal/Modal";
import MainButton from "../../components/Buttons/MainButton/MainButton";

import styles from "./OrderViev.module.scss";

const OrderViev = (props) => {
  const OrderInformation =
    !props.vievClient || !props.vievCarrier || !props.orderObject ? (
      ""
    ) : (
      <div className={styles.wrapper}>
        <h2>Zlecenie transportowe nr {props.orderNumber}</h2>
        <div className={styles.clientData}>
          <h3>dane klienta</h3>
          <p>{props.vievClient[0].companyName}</p>
          <p>{props.vievClient[0].companyAdress}</p>
          <p>{props.vievClient[0].vatNo}</p>
        </div>
        <div className={styles.carrierData}>
          <h3>dane przewoźnika</h3>
          <p>{props.vievCarrier[0].companyName}</p>
          <p>{props.vievCarrier[0].companyAdress}</p>
          <p>{props.vievCarrier[0].vatNo}</p>
        </div>
        <div className={styles.orderData}>
          <h3>dane zlecenia</h3>
          <div className={styles.load}>
            <p>załadunek</p>
            <p>{props.orderObject.loadDate}</p>
            <p>{props.orderObject.loadHrs}</p>
            <p>{props.orderObject.loadAdress}</p>
          </div>
          <div className={styles.unload}>
            <p>rozładunek</p>
            <p>{props.orderObject.unloadDate}</p>
            <p>{props.orderObject.unloadHrs}</p>
            <p>{props.orderObject.unloadAdress}</p>
          </div>
          <p>ładunek :{props.orderObject.goodsSpecification}</p>
          <p>kierowca: {props.orderObject.driver}</p>
          <p>pojazd: {props.orderObject.truck}</p>
          <p>{props.orderObject.adr}</p>
          <p> {props.orderObject.fix}</p>
          <p>uwagi: {props.orderObject.notes}</p>
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
