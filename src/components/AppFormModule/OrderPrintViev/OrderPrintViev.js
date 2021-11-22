import { useContext, useRef, useEffect, useState } from "react";
import ReactToPrint from "react-to-print";

import MainButton from "../../Buttons/MainButton/MainButton";
import BackButton from "../../Buttons/BackButton/BackButton";
import { COMPANY_DATA } from "../../../helpers/companyData";
import { OWNED_COMPANY } from "../../../helpers/companyData";

import { StoreContext } from "../../../Store/StoreProvider";

import styles from "./OrderViev.module.scss";

const OrderPrintViev = () => {
  const componentRef = useRef();

  const { printOrderData, cookie, user } = useContext(StoreContext);

  const [companyDataFromLocal, setCompanyDataFromLocal] = useState(false);

  const [enLanguage, setEnLanguage] = useState(false);

  const checkCompanyData = () => {
    if (!localStorage.getItem("companyData")) {
      setCompanyDataFromLocal({
        companyName: "",
        companyAdress: "",
        vatNo: "",
      });
    } else if (localStorage.length) {
      setCompanyDataFromLocal(JSON.parse(localStorage.getItem("companyData")));
    }
  };
  useEffect(() => {
    checkCompanyData();
  }, []);

  const handlePrint = () => {
    var content = document.getElementById("wrapper");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };

  const companyData = COMPANY_DATA.map((item) => <li key={item}>{item}</li>);

  const { name, adress, vatNo } = OWNED_COMPANY;

  const {
    carrierAdress,
    carrierName,
    carrierVatNo,
    orderDriver,
    orderFix,
    orderAdr,
    orderTransitTime,
    orderGoodsSpecyfications,
    orderWeight,
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
    orderCarrierPrice,
    orderCarrierCurr,
    orderCarrierTerms,
  } = printOrderData;

  const OrderInformation = (
    <div className={styles.wrapper} ref={componentRef}>
      <div className={styles.header}>
        <h2>
          {!enLanguage ? "Zlecenie transportowe nr:" : "Transport order No:"}{" "}
          {orderNumber}
        </h2>
        <div className={styles.client}>
          <p> {!enLanguage ? "Zleceniodawca" : "Forwarder:"}</p>
          <h3>{!user || !cookie ? companyDataFromLocal.companyName : name}</h3>
          <p>
            {!user || !cookie ? companyDataFromLocal.companyAdress : adress}
          </p>
          <p> {!user || !cookie ? companyDataFromLocal.vatNo : vatNo}</p>
        </div>
        <div className={styles.carrier}>
          <p> {!enLanguage ? "Zleceniobiorca" : "Transport company:"}</p>
          <h3>{carrierName}</h3>
          <p>{carrierAdress}</p>
          <p>{carrierVatNo}</p>
        </div>
      </div>
      <div className={styles.order}>
        <div className={styles.load}>
          <div className={styles.date}>
            <h3> {!enLanguage ? "Załadunek:" : "Loading:"}</h3>
            <p>{!orderLoadDate ? "" : orderLoadDate}</p>
            <p>
              {" "}
              {!enLanguage ? "godz:" : "hrs:"}{" "}
              {!orderLoadHrs ? "" : orderLoadHrs}
            </p>
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
            <h3> {!enLanguage ? "Rozładunek:" : "Unloading:"}</h3>
            <p>{!orderUnloadDate ? "" : orderUnloadDate}</p>
            <p>
              {!enLanguage ? "godz:" : "hrs:"}
              {!orderUnloadHrs ? "" : orderUnloadHrs}
            </p>
          </div>
          <div className={styles.place}>
            <p>{!orderUnloadCountry ? "" : orderUnloadCountry}</p>
            <p>{!orderUnloadZip ? "" : orderUnloadZip}</p>
            <p>{!orderUnloadCity ? "" : orderUnloadCity}</p>
            <p>{!orderUnloadAdress ? "" : orderUnloadAdress}</p>
          </div>
        </div>
        <div className={styles.cargo}>
          <h3>{!enLanguage ? "Dane zlecenia:" : "Order data:"}</h3>

          <div className={styles.specyfication}>
            <div>
              <p>ADR:</p>
              <span>
                {!orderAdr ? <p>{!enLanguage ? "brak:" : "no:"}</p> : orderAdr}
              </span>
            </div>
            <div className={styles.weight}>
              <p>{!enLanguage ? "waga:" : "weight:"}</p>
              <span>{orderWeight} kgs</span>
            </div>
            <div className={styles.goods}>
              <p>{!enLanguage ? "towar:" : "goods:"}</p>
              <span>
                {!orderGoodsSpecyfications ? "" : orderGoodsSpecyfications}
              </span>
            </div>
          </div>
          <div className={styles.drivers}>
            <div>
              {" "}
              <p>{!enLanguage ? "kierowca:" : "driver:"}</p>
              <span>{!orderDriver ? "" : orderDriver}</span>
            </div>
            <div>
              {" "}
              <p>{!enLanguage ? "pojazd:" : "truck:"}</p>
              <span>{!orderTruck ? "" : orderTruck}</span>
            </div>
          </div>
          <div className={styles.fix}>
            <div>
              <p>FIX:</p>
              <span>
                {!orderFix ? <p>{!enLanguage ? "brak:" : "no:"}</p> : orderFix}
              </span>
            </div>

            <div className={styles.fixWorrning}>
              <p>
                {!orderFix
                  ? ""
                  : !enLanguage
                  ? `Czas tranzytu to: ${orderTransitTime}, liczony od momentu załadunku do momentu rozładunku. Opóźnienie na załadunek / rozładunek skutkuje pomniejszeniem frachtu o ${
                      Number(orderWeight) < 1001 ? "20Euro" : "40Euro"
                    } za każdą godzinę, powyżej 2h`
                  : `Transit time is:  ${orderTransitTime}, counted from the moment of loading to the moment of unloading. Delay for loading / unloading results in a reduction of the freight by ${
                      Number(orderWeight) < 1001 ? "20Euro" : "40Euro"
                    } per hour, over 2h`}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.conditions}>
        <div>
          <h3>
            <p>{!enLanguage ? "Fracht:" : "Freight:"}</p>{" "}
          </h3>
          <h3>{` ${orderCarrierPrice} ${orderCarrierCurr} All-In`}</h3>
        </div>
        <div>
          <p>{!enLanguage ? "Termin płatności:" : "Date of payment:"}</p>
          <span>
            {orderCarrierTerms} {!enLanguage ? "dni" : "days"}
          </span>
        </div>
      </div>
      <div className={styles.companyData}>
        <ul>{companyData}</ul>
      </div>
      <div className={styles.signatures}>
        <p>
          {!enLanguage ? "podpis zleceniobiorcy:" : "contractor's signature:"}
        </p>
        <p>{!enLanguage ? "podpis zleceniodawcy:" : "client's signature:"}</p>
      </div>
    </div>
  );

  const handleSwitchLanguage = () => {
    setEnLanguage(!enLanguage);
  };

  return (
    <div className={styles.mainWrapper}>
      {OrderInformation}
      <div className={styles.buttons}>
        <ReactToPrint
          trigger={() => <MainButton name="drukuj" />}
          content={() => componentRef.current}
        ></ReactToPrint>
        <MainButton
          onClick={handleSwitchLanguage}
          name={!enLanguage ? "język EN" : "język PL"}
        />
        <BackButton />
      </div>
    </div>
  );
};

export default OrderPrintViev;
