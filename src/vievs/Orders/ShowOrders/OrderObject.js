import { useState } from "react";

import MainButton from "../../../components/Buttons/MainButton/MainButton";

import styles from "./OrderObject.module.scss";

const OrderObject = (client, setTaskInformation) => {
  const [showDetails, setShowDetails] = useState(false);

  const {
    carrierAdress,
    carrierName,
    carrierVatNo,
    clientAdress,
    clientName,
    clientVatNo,
    orderDriver,
    orderFix,
    orderGoodsSpecyfications,
    orderLoadDate,
    orderLoadHrs,
    orderLoadAdress,
    orderNumber,
    orderTruck,
    orderUnloadAdress,
    orderUnloadDate,
    orderUnloadHrs,
  } = client.client;

  // managment of show/hide details of order

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const showDetailsButton = !showDetails ? (
    <MainButton name="szczegóły" onClick={handleShowDetails} />
  ) : (
    <MainButton name="ukryj" onClick={handleShowDetails} />
  );

  const showDetailsOrder = !showDetails ? (
    ""
  ) : (
    <>
      <div className={styles.item}>
        <div className={styles.item}>
          <p>ładunek: </p>
          <p>{orderGoodsSpecyfications}</p>
        </div>
        <p>kierowca: </p>
        <p>{orderDriver}</p>
      </div>
      <div className={styles.item}>
        <p>pojazd: </p>
        <p>{orderTruck}</p>
      </div>
    </>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.item}>
        <p>Nr zlecenia:</p>
        <p>{orderNumber}</p>
      </div>
      <div className={styles.item}>
        <p>Klient:</p>
        <p>{clientName}</p>
        <MainButton name="edytuj" />
      </div>
      <div className={styles.item}>
        <p>Przewoźnik:</p>
        <p>{carrierName}</p>
        <MainButton name="edytuj" />
      </div>
      <div className={styles.orderData}>
        <h3>dane zlecenia</h3>
        <MainButton name="edytuj" />
        <div className={styles.item}>
          <p>załadunek:</p>
          <p>{orderLoadDate}</p>
          <p>{orderLoadAdress}</p>
        </div>
        <div className={styles.item}>
          <p>rozładunek:</p>
          <p>{orderUnloadDate}</p>
          <p>{orderUnloadAdress}</p>
        </div>
        {showDetailsOrder}
      </div>
      <div className={styles.buttons}>
        {showDetailsButton}
        <MainButton name="drukuj" />
        <MainButton name="usuń" />
      </div>
    </div>
  );
};

export default OrderObject;
