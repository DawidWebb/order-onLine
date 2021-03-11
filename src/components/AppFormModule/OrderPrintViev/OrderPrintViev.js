import { useContext, useRef } from "react";
import ReactToPrint from "react-to-print";

import MainButton from "../../Buttons/MainButton/MainButton";
import BackButton from "../../Buttons/BackButton/BackButton";
import { COMPANY_DATA } from "../../../helpers/companyData";
import { OWNED_COMPANY } from "../../../helpers/companyData";

import { StoreContext } from "../../../Store/StoreProvider";

import styles from "./OrderViev.module.scss";

const OrderPrintViev = () => {
  const componentRef = useRef();

  const { printOrderData } = useContext(StoreContext);

  const handlePrint = () => {
    var content = document.getElementById("wrapper");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };

  const companyData = COMPANY_DATA.map((item) => (
    <li key={item.index}>{item}</li>
  ));

  const { name, adress, vatNo } = OWNED_COMPANY;

  const {
    carrierAdress,
    carrierName,
    carrierVatNo,
    _id,
    orderDriver,
    orderFix,
    orderAdr,
    orderNotes,
    orderGoodsSpecyfications,
    orderLoadDate,
    orderLoadHrs,
    orderLoadCountry,
    orderLoadZip,
    orderLoadCity,
    orderLoadAdress,
    orderNumber,
    orderTruck,
    orderUnloadAdress,
    orderUnloadCountry,
    orderUnloadZip,
    orderUnloadCity,
    orderUnloadDate,
    orderUnloadHrs,
    orderClientPrice,
    orderClientCurr,
    orderClientTerms,
    orderCarrierPrice,
    orderCarrierCurr,
    orderCarrierTerms,
  } = printOrderData;

  const OrderInformation = (
    <div className={styles.wrapper} ref={componentRef}>
      <div className={styles.header}>
        <h2>Zlecenie transportowe nr: {orderNumber}</h2>
        <div className={styles.client}>
          <p>Zleceniodawca:</p>
          <h3>{name}</h3>
          <p>{adress}</p>
          <p>{vatNo}</p>
        </div>
        <div className={styles.carrier}>
          <p>Zleceniobiorca:</p>
          <h3>{carrierName}</h3>
          <p>{carrierAdress}</p>
          <p>{carrierVatNo}</p>
        </div>
      </div>
      <div className={styles.order}>
        <div className={styles.load}>
          <div className={styles.date}>
            <h3>Załadunek:</h3>
            <p>{!orderLoadDate ? "" : orderLoadDate}</p>
            <p>godz: {!orderLoadHrs ? "" : orderLoadHrs}</p>
          </div>
          <div className={styles.place}>
            <p>{!orderLoadCountry ? "" : orderLoadCountry}</p>
            <p>{!orderLoadZip ? "" : orderLoadZip}</p>
            <p>{!orderLoadCity ? "" : orderLoadCity}</p>
            <p>{!orderLoadAdress ? "" : orderLoadAdress}</p>
          </div>
        </div>
        <div className={styles.unload}>
          <div className={styles.date}>
            <h3>Rozładunek:</h3>
            <p>{!orderUnloadDate ? "" : orderUnloadDate}</p>
            <p>godz: {!orderUnloadHrs ? "" : orderUnloadHrs}</p>
          </div>
          <div className={styles.place}>
            <p>{!orderUnloadCountry ? "" : orderUnloadCountry}</p>
            <p>{!orderUnloadZip ? "" : orderUnloadZip}</p>
            <p>{!orderUnloadCity ? "" : orderUnloadCity}</p>
            <p>{!orderUnloadAdress ? "" : orderUnloadAdress}</p>
          </div>
        </div>
        <div className={styles.cargo}>
          <h3>Dane zlecenia:</h3>

          <div>
            <p>towar/specyfikacja:</p>
            <span>
              {!orderGoodsSpecyfications ? "" : orderGoodsSpecyfications}
            </span>
          </div>
          <div>
            {" "}
            <p>kierowca:</p>
            <span>{!orderDriver ? "" : orderDriver}</span>
          </div>
          <div>
            {" "}
            <p>pojazd:</p>
            <span>{!orderTruck ? "" : orderTruck}</span>
          </div>
          <div>
            {" "}
            <p>uwagi:</p>
            <span>{!orderNotes ? "" : orderNotes}</span>
          </div>
          <div>
            {" "}
            <p>ADR:</p>
            <span>{!orderAdr ? "brak" : orderAdr}</span>
          </div>
          <div>
            {" "}
            <p>Fix:</p>
            <span>{!orderFix ? "brak" : orderFix}</span>
          </div>
        </div>
      </div>
      <div className={styles.conditions}>
        <div>
          <h3>Fracht: </h3>
          <h3>{` ${orderCarrierPrice} ${orderCarrierCurr} All-In`}</h3>
        </div>
        <div>
          <p>termin płatności: </p>
          <span>{orderCarrierTerms} dni</span>
        </div>
      </div>
      <div className={styles.companyData}>
        <ul>{companyData}</ul>
      </div>
      <div className={styles.signatures}>
        <p>podpis zleceniobiorcy</p>
        <p>podpis zleceniodawcy</p>
      </div>
    </div>
  );
  return (
    <div>
      {OrderInformation}
      <div className={styles.buttons}>
        <ReactToPrint
          trigger={() => <MainButton name="drukuj" />}
          content={() => componentRef.current}
        ></ReactToPrint>
        <BackButton />
      </div>
      {/* <iframe
        className={styles.ifmcontentstoprint}
        title="Wydruk z programu zlecenie Online"
        id="ifmcontentstoprint"
        style={{ height: "0px", width: "0px", position: "absolute" }}
      ></iframe> */}
    </div>
  );
};

export default OrderPrintViev;
