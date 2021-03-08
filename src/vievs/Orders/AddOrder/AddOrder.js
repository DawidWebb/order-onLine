import { useContext, useEffect, useState, useRef } from "react";
import { Form, Field } from "react-final-form";

import Spinner from "../../../components/Spinner/Spinner";
import MainButton from "../../../components/Buttons/MainButton/MainButton";
import SelectButton from "../../../components/Buttons/SelectButton/SelectButton";
import BackButton from "../../../components/Buttons/BackButton/BackButton";
import AddClientForm from "../../../components/ClientModule/AddClientForm/AddClientForm";
import SerchModal from "../../../components/ClientModule/SearchModal/SearchModal";
import InformationPopup from "../../../components/InformationPopup/InforationPopup";
import AddOrderForm from "../../../components/AppFormModule/AddOrderForm/AddOrderForm";
import OrderViev from "./OrderViev";

import request from "../../../helpers/request";
import { StoreContext } from "../../../Store/StoreProvider";

import styles from "./AddOrder.module.scss";

const AddOrder = () => {
  // global state
  const { serchedClient } = useContext(StoreContext);

  // state for Modals
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [addOrderModalOpen, setAddOrderModalOpen] = useState(false);
  const [vievModalOpen, setVievModalOpen] = useState(false);
  const [taskInformation, setTaskInformation] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  // state for client or carrier viev
  const [selectedClient, setSelectedClient] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState(false);

  // state for client, carrier and order data
  const [vievClient, setVievClient] = useState(false);
  const [vievCarrier, setVievCarrier] = useState(false);
  const [orderObject, setOrderObject] = useState(false);

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
    setVievModalOpen(false);
  };

  //handlers and helpers for viev clear and save order data
  const createOrderNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    return `${month}/${year}`;
  };

  const orderFullObject = () => {
    const orderNumber = createOrderNumber();
    return {
      orderNumber: orderNumber,
      clientName: vievClient[0].companyName,
      clientAdress: vievClient[0].companyAdress,
      clientVatNo: vievClient[0].vatNo,
      carrierName: vievCarrier[0].companyName,
      carrierAdress: vievCarrier[0].companyAdress,
      carrierVatNo: vievCarrier[0].vatNo,
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
    };
  };

  const handleVievOrder = () => {
    setVievModalOpen(true);
    console.log(vievClient);
    console.log(vievCarrier);
    console.log(orderObject);
  };
  const handleClearOrder = () => {
    setVievClient(false);
    setVievCarrier(false);
    setOrderObject(false);
  };
  const handleSaveOrder = async () => {
    setShowSpinner(true);
    const orderObject = orderFullObject();
    const { data, status } = await request.post("/orders", orderObject);

    if (status === 201) {
      console.log(orderObject);
      setShowSpinner(false);
    } else if (status === 409) {
    } else {
      console.log(data.message);
    }
  };

  // constans for data and button viev
  const loadData = `${orderObject.loadCity} - ${orderObject.unloadCity}`;

  const operationButtons =
    !vievClient || !vievCarrier || !orderObject ? (
      ""
    ) : (
      <>
        <SelectButton name="Podgląd" onClick={handleVievOrder} />
        <MainButton name="Wyczyść" onClick={handleClearOrder} />
        <SelectButton name="Zapisz" onClick={handleSaveOrder} />
      </>
    );

  const spinner = showSpinner ? <Spinner /> : "";

  return (
    <div className={styles.wrapper}>
      <h2>Dodawanie zlecenia</h2>
      <div className={styles.client}>
        <div className={styles.dataInfo}>
          <p>Klient:</p>
          <div>{!vievClient ? "" : vievClient[0].companyName}</div>
        </div>
        <div className={styles.buttons}>
          <MainButton name="pobierz" onClick={handleSearchClientModalOpen} />
          <MainButton name="dodaj" onClick={handleAddClientModalOpen} />
        </div>
      </div>
      <div className={styles.carrier}>
        <div className={styles.dataInfo}>
          <p>Przewoźnik:</p>
          <div> {!vievCarrier ? "" : vievCarrier[0].companyName}</div>
        </div>
        <div className={styles.buttons}>
          <MainButton name="pobierz" onClick={handleSearchCarrierModalOpen} />
          <MainButton name="dodaj" onClick={handleAddCarrierModalOpen} />
        </div>
      </div>
      <div className={styles.order}>
        <div className={styles.dataInfo}>
          <p>Zlecenie:</p>
          <div> {!orderObject ? "" : loadData}</div>
        </div>
        <div className={styles.buttons}>
          <MainButton name="dodaj" onClick={handleAddOrderModalOpen} />
          <MainButton name="model" />
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
      <OrderViev
        isModalOpen={vievModalOpen}
        handleOnClose={handleCloseModal}
        vievClient={vievClient}
        vievCarrier={vievCarrier}
        orderObject={orderObject}
      />
      <div className={styles.operationButtons}>{operationButtons}</div>
      <div className={styles.backButton}>
        <BackButton />
      </div>
      <div className={styles.spinnerWrapper}>{spinner}</div>
    </div>
  );
};

export default AddOrder;
