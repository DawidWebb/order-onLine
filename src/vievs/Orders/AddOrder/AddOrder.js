import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Spinner from "../../../components/Spinner/Spinner";
import MainButton from "../../../components/Buttons/MainButton/MainButton";
import SelectButton from "../../../components/Buttons/SelectButton/SelectButton";
import BackButton from "../../../components/Buttons/BackButton/BackButton";
import AddClientForm from "../../../components/ClientModule/AddClientForm/AddClientForm";
import SerchModal from "../../../components/ClientModule/SearchModal/SearchModal";
import InformationPopup from "../../../components/InformationPopup/InforationPopup";
import AddOrderForm from "../../../components/AppFormModule/AddOrderForm/AddOrderForm";
import AddConditionsForm from "../../../components/AppFormModule/AddConditionsForm/AddConditionsForm";

import request from "../../../helpers/request";
import { StoreContext } from "../../../Store/StoreProvider";

import styles from "./AddOrder.module.scss";

const AddOrder = () => {
  let history = useHistory();
  // global state
  const {
    serchedClient,
    setOrdersData,
    orderNumber,
    setOrderNumber,
  } = useContext(StoreContext);

  // state for Modals
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [addOrderModalOpen, setAddOrderModalOpen] = useState(false);
  const [addConditionsModalOpen, setAddConditionsModalOpen] = useState(false);
  const [taskInformation, setTaskInformation] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  // state for client or carrier viev
  const [selectedClient, setSelectedClient] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState(false);

  // state for client, carrier and order data
  const [vievClient, setVievClient] = useState(false);
  const [vievCarrier, setVievCarrier] = useState(false);
  const [orderObject, setOrderObject] = useState(false);
  const [conditions, setConditions] = useState(false);

  // effect for viev client or carrier
  useEffect(() => {
    if (selectedClient) {
      setVievClient(serchedClient);
      setSelectedClient(false);
    }
    if (selectedCarrier) {
      setVievCarrier(serchedClient);
      setSelectedCarrier(false);
    }
  }, [serchedClient]);

  // // effect for viev task information
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (taskInformation) {
        setTaskInformation(false);
      }
    }, 2000);
    return () => clearInterval(timeout);
  }, [taskInformation]);

  // handlers for open/close modals
  const handleSearchClientModalOpen = () => {
    setSearchModalOpen(true);
    setSelectedClient(true);
  };

  const handleAddClientModalOpen = () => {
    setAddModalOpen(true);
    setSelectedClient(true);
  };

  const handleSearchCarrierModalOpen = () => {
    setSearchModalOpen(true);
    setSelectedCarrier(true);
  };

  const handleAddCarrierModalOpen = () => {
    setAddModalOpen(true);
    setSelectedCarrier(true);
  };

  const handleAddOrderModalOpen = () => {
    setAddOrderModalOpen(true);
  };

  const handleCloseModal = () => {
    setAddModalOpen(false);
    setSearchModalOpen(false);
    setAddOrderModalOpen(false);
    setAddConditionsModalOpen(false);
  };

  //handlers and helpers for viev clear and save order data
  const createOrderNumber = () => {
    setOrderNumber(orderNumber + 1);
    const months = [
      "styczeń",
      "luty",
      "marzec",
      "kwieceiń",
      "maj",
      "czerwiec",
      "lipiec",
      "sierpień",
      "wrzeseiń",
      "paźdzeirnik",
      "listopad",
      "grudzeiń",
    ];
    let date = new Date();
    const year = date.getFullYear();
    const monthNo = date.getMonth();
    const month = months[monthNo];
    return `${orderNumber}/${month}/${year}`;
  };

  const orderFullObject = () => {
    const orderNo = createOrderNumber();
    return {
      orderNumber: orderNo,
      //client data
      clientName: vievClient[0].companyName,
      clientAdress: vievClient[0].companyAdress,
      clientVatNo: vievClient[0].vatNo,
      // carrier data
      carrierName: vievCarrier[0].companyName,
      carrierAdress: vievCarrier[0].companyAdress,
      carrierVatNo: vievCarrier[0].vatNo,
      //order data
      orderLoadDate: orderObject.loadDate,
      orderLoadHrs: orderObject.loadHrs,
      orderLoadCountry: orderObject.loadCountry,
      orderLoadZip: orderObject.loadZip,
      orderLoadCity: orderObject.loadCity,
      orderLoadAdress: orderObject.loadAdress,
      orderUnloadDate: orderObject.unloadDate,
      orderUnloadHrs: orderObject.unloadHrs,
      orderUnloadCountry: orderObject.unloadCountry,
      orderUnloadZip: orderObject.unloadZip,
      orderUnloadCity: orderObject.unloadCity,
      orderUnloadAdress: orderObject.unloadAdress,
      orderGoodsSpecyfications: orderObject.goodsSpecification,
      orderDriver: orderObject.driver,
      orderTruck: orderObject.truck,
      orderAdr: !orderObject.adr ? "" : orderObject.adr[0],
      orderFix: !orderObject.fix ? "" : orderObject.fix[0],
      orderInfo: orderObject.info,
      //conditions data
      orderClientPrice: conditions.clientPrice,
      orderClientCurr: conditions.clientCurr,
      orderClientTerms: conditions.clientTerms,
      orderCarrierPrice: conditions.carrierPrice,
      orderCarrierCurr: conditions.carrierCurr,
      orderCarrierTerms: conditions.carrierTerms,
    };
  };

  const handleClearOrder = () => {
    setVievClient(false);
    setVievCarrier(false);
    setOrderObject(false);
    setConditions(false);
  };
  const handleSaveOrder = async () => {
    setShowSpinner(true);
    const orderObject = orderFullObject();
    const { data, status } = await request.post("/orders", orderObject);

    if (status === 201) {
      setTaskInformation("Dodano zlecenie");
      setShowSpinner(false);
      setOrdersData((prev) => [data.data, ...prev]);

      if (taskInformation === false) {
        history.push("./showorders");
      }
    } else if (status === 409) {
    } else {
      console.log(data.message);
    }
  };

  // constans for data and button viev
  const clientInformationViev = !vievClient ? (
    ""
  ) : (
    <div>
      <h3>{vievClient[0].companyName}</h3>
      <p>{vievClient[0].companyAdress}</p>
      <p>{vievClient[0].vatNo}</p>
    </div>
  );
  const carriertInformationViev = !vievCarrier ? (
    ""
  ) : (
    <div>
      <h3>{vievCarrier[0].companyName}</h3>
      <p>{vievCarrier[0].companyAdress}</p>
      <p>{vievCarrier[0].vatNo}</p>
    </div>
  );

  const loadData = `${orderObject.loadCity} - ${orderObject.unloadCity}`;

  const operationButtons =
    !vievClient || !vievCarrier || !orderObject || !conditions ? (
      ""
    ) : (
      <>
        <SelectButton name="Wyczyść" onClick={handleClearOrder} />
        <SelectButton name="Zapisz" onClick={handleSaveOrder} />
      </>
    );

  const addOrChangeNameButton = !orderObject ? "dodaj" : "zmień";

  const spinner = showSpinner ? <Spinner /> : "";

  // set Conditions
  const handleAddConditionsModalOpen = () => {
    setAddConditionsModalOpen(true);
  };

  return (
    <div className={styles.wrapper}>
      <h2>Dodawanie zlecenia</h2>
      <div className={styles.client}>
        <div className={styles.dataInfo}>
          <p>Klient:</p>
          {clientInformationViev}
        </div>
        <div className={styles.buttons}>
          <MainButton
            name={!vievClient ? "pobierz" : "zmień"}
            onClick={handleSearchClientModalOpen}
          />
          <MainButton name="dodaj" onClick={handleAddClientModalOpen} />
        </div>
      </div>
      <div className={styles.carrier}>
        <div className={styles.dataInfo}>
          <p>Przewoźnik:</p>
          {carriertInformationViev}
        </div>
        <div className={styles.buttons}>
          <MainButton
            name={!vievCarrier ? "pobierz" : "zmień"}
            onClick={handleSearchCarrierModalOpen}
          />
          <MainButton name="dodaj" onClick={handleAddCarrierModalOpen} />
        </div>
      </div>
      <div className={styles.order}>
        <div className={styles.dataInfo}>
          <p>Zlecenie:</p>
          <div> {!orderObject ? "" : loadData}</div>
        </div>
        <div className={styles.buttons}>
          <MainButton
            name={`${addOrChangeNameButton}`}
            onClick={handleAddOrderModalOpen}
          />
          <MainButton name="model" />
        </div>
      </div>
      <div className={styles.conditions}>
        <table className={styles.dataInfoTable}>
          <tr>
            <th></th>
            <th>Klient</th>
            <th>Przewoźnik</th>
          </tr>
          <tr>
            <th>Fracht</th>
            <td>
              {conditions.clientPrice} <span>{conditions.clientCurr}</span>
            </td>
            <td>
              {conditions.carrierPrice} <span>{conditions.carrierCurr}</span>
            </td>
          </tr>
          <tr>
            <th>Termin</th>
            <td>{conditions.clientTerms} dni</td>
            <td>{conditions.carrierTerms} dni</td>
          </tr>
        </table>

        <div className={styles.buttons}>
          <MainButton
            name={!conditions ? "dodaj" : "zmień"}
            onClick={handleAddConditionsModalOpen}
          />
        </div>
      </div>
      <AddClientForm
        isModalOpen={addModalOpen}
        handleOnClose={handleCloseModal}
        setTaskInformation={setTaskInformation}
      />
      <SerchModal
        isModalOpen={searchModalOpen}
        handleCloseModal={handleCloseModal}
      />
      <div className={styles.informationPopup}>
        <InformationPopup taskInformation={taskInformation} />
      </div>
      <AddOrderForm
        isModalOpen={addOrderModalOpen}
        handleOnClose={handleCloseModal}
        setOrderObject={setOrderObject}
      />
      <AddConditionsForm
        isModalOpen={addConditionsModalOpen}
        handleOnClose={handleCloseModal}
        setConditions={setConditions}
      />
      <div className={styles.operationButtons}>
        {operationButtons}
        <BackButton />
      </div>

      <div className={styles.spinnerWrapper}>{spinner}</div>
    </div>
  );
};

export default AddOrder;
