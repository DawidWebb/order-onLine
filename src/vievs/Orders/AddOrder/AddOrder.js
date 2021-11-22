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
import CreateOrderNumber from "../../../components/FunctionsForOrders/CreateOrderNumber/CreateOrderNumber";

import request from "../../../helpers/request";
import { StoreContext } from "../../../Store/StoreProvider";

import styles from "./AddOrder.module.scss";

const AddOrder = () => {
  let history = useHistory();
  // global state
  const {
    serchedClient,
    setOrdersData,
    copiedOrderData,
    kindOfTask,
    setKindOfTask,
    currentOrderNumber,
    setNewOdredNumber,
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

  const setUpCopiedOrderData = () => {
    if (!copiedOrderData) {
      return;
    }
    setVievClient([
      {
        companyName: copiedOrderData.clientName,
        companyAdress: copiedOrderData.clientAdress,
        vatNo: copiedOrderData.clientVatNo,
      },
    ]);
    setVievCarrier([
      {
        companyName: copiedOrderData.carrierName,
        companyAdress: copiedOrderData.carrierAdress,
        vatNo: copiedOrderData.carrierVatNo,
      },
    ]);
    setOrderObject({
      loadDate: copiedOrderData.orderLoadDate,
      loadHrs: copiedOrderData.orderLoadHrs,
      loadCountry: copiedOrderData.orderLoadCountry,
      loadZip: copiedOrderData.orderLoadZip,
      loadCity: copiedOrderData.orderLoadCity,
      loadAdress: copiedOrderData.orderLoadAdress,
      unloadDate: copiedOrderData.orderUnloadDate,
      unloadHrs: copiedOrderData.orderUnloadHrs,
      unloadCountry: copiedOrderData.orderUnloadCountry,
      unloadZip: copiedOrderData.orderUnloadZip,
      unloadCity: copiedOrderData.orderUnloadCity,
      unloadAdress: copiedOrderData.orderUnloadAdress,
      goodsSpecification: copiedOrderData.orderGoodsSpecyfications,
      driver: copiedOrderData.orderDriver,
      truck: copiedOrderData.orderTruck,
      fix: copiedOrderData.orderFix,
      adr: copiedOrderData.orderAdr,
      orderID: "",
    });

    setConditions({
      clientPrice: copiedOrderData.orderClientPrice,
      clientCurr: copiedOrderData.orderClientCurr,
      clientTerms: copiedOrderData.orderClientTerms,
      carrierPrice: copiedOrderData.orderCarrierPrice,
      carrierCurr: copiedOrderData.orderCarrierCurr,
      carrierTerms: copiedOrderData.orderCarrierTerms,
    });
  };
  // effect for set copied data
  useEffect(() => {
    setUpCopiedOrderData();
  }, [copiedOrderData]);

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
      if (
        taskInformation === "Dodano zlecenie" ||
        taskInformation === "Dane zlecenia zmodyfikowane"
      ) {
        history.push("./showorders");
        setTaskInformation(false);
      } else if (
        taskInformation === "Dodano klienta" ||
        taskInformation === "Potwierdź lub zmień daty"
      ) {
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

  const orderFullObject = () => {
    let newOrderNumber;
    const switchOrderNumber = () => {
      if (!kindOfTask || kindOfTask === "copy") {
        newOrderNumber = CreateOrderNumber({
          currentOrderNumber,
          setNewOdredNumber,
        });
      } else if (kindOfTask === "edit") {
        newOrderNumber = copiedOrderData._id;
      }
      return newOrderNumber;
    };

    return {
      orderNumber: switchOrderNumber(),
      //client data
      clientName: vievClient[0].companyName,
      clientAdress: vievClient[0].companyAdress,
      clientVatNo: vievClient[0].vatNo,
      // carrier data
      carrierName: vievCarrier[0].companyName,
      carrierAdress: vievCarrier[0].companyAdress,
      carrierVatNo: vievCarrier[0].vatNo,
      //order data
      orderLoadDate: !orderObject.loadDate ? "" : orderObject.loadDate,
      orderLoadHrs: !orderObject.loadHrs ? "" : orderObject.loadHrs,
      orderLoadCountry: !orderObject.loadCountry ? "" : orderObject.loadCountry,
      orderLoadZip: !orderObject.loadZip ? "" : orderObject.loadZip,
      orderLoadCity: !orderObject.loadCity ? "" : orderObject.loadCity,
      orderLoadAdress: !orderObject.loadAdress ? "" : orderObject.loadAdress,
      orderUnloadDate: !orderObject.unloadDate ? "" : orderObject.unloadDate,
      orderUnloadHrs: !orderObject.unloadHrs ? "" : orderObject.unloadHrs,
      orderUnloadCountry: !orderObject.unloadCountry
        ? ""
        : orderObject.unloadCountry,
      orderUnloadZip: !orderObject.unloadZip ? "" : orderObject.unloadZip,
      orderUnloadCity: !orderObject.unloadCity ? "" : orderObject.unloadCity,
      orderUnloadAdress: !orderObject.unloadAdress
        ? ""
        : orderObject.unloadAdress,
      orderGoodsSpecyfications: !orderObject.goodsSpecyfications
        ? ""
        : orderObject.goodsSpecyfications,
      orderWeight: !orderObject.weight ? 1000 : orderObject.weight,
      orderDriver: !orderObject.driver ? "" : orderObject.driver,
      orderTruck: !orderObject.truck ? "" : orderObject.truck,
      orderAdr: !orderObject.adr ? "" : orderObject.adr,
      orderFix: !orderObject.fix ? "" : orderObject.fix,
      orderTransitTime: !orderObject.transitTime ? "" : orderObject.transitTime,
      orderID: !orderObject.orderID ? "" : orderObject.orderID,
      //conditions data
      orderClientPrice: !conditions.clientPrice ? "" : conditions.clientPrice,
      orderClientCurr: !conditions.clientCurr ? "" : conditions.clientCurr,
      orderClientTerms: !conditions.clientTerms ? "" : conditions.clientTerms,
      orderCarrierPrice: !conditions.carrierPrice
        ? ""
        : conditions.carrierPrice,
      orderCarrierCurr: !conditions.carrierCurr ? "" : conditions.carrierCurr,
      orderCarrierTerms: !conditions.carrierTerms
        ? ""
        : conditions.carrierTerms,
    };
  };

  const handleClearOrder = () => {
    setVievClient(false);
    setVievCarrier(false);
    setOrderObject(false);
    setConditions(false);
  };

  // post all data order to backand
  const handleSaveOrder = async () => {
    setKindOfTask(false);
    setShowSpinner(true);
    const postOrderObject = orderFullObject();
    console.log(postOrderObject);
    const { data, status } = await request.post("/orders", postOrderObject);

    if (status === 201) {
      setTaskInformation("Dodano zlecenie");
      setShowSpinner(false);
      setOrdersData([data.data]);
    } else {
      console.log(data.message);
      setShowSpinner(false);
    }
  };

  //edit selected order
  const handleOnEditOrder = async () => {
    setShowSpinner(true);
    const editOrderObject = orderFullObject();
    const { data, status } = await request.put("/orders", editOrderObject);

    if (status === 202) {
      setTaskInformation("Dane zlecenia zmodyfikowane");
      setShowSpinner(false);
      setOrdersData([data.data]);
    } else {
      setShowSpinner(false);
      setTaskInformation("Potwierdź lub zmień daty");
      console.log(status, data.message);
    }
  };

  // constans for data and button viev

  const clientInformationViev = !vievClient ? (
    ""
  ) : (
    <div>
      <h3>
        {!vievClient[0]
          ? "Pobierz zapisanego klienta"
          : vievClient[0].companyName}
      </h3>
      <p>{!vievClient[0] ? "" : vievClient[0].companyAdress}</p>
      <p>{!vievClient[0] ? "" : vievClient[0].vatNo}</p>
    </div>
  );

  const carriertInformationViev = !vievCarrier ? (
    ""
  ) : (
    <div>
      <h3>
        {!vievCarrier[0]
          ? "Pobierz zapisanego przewoźnika"
          : vievCarrier[0].companyName}
      </h3>
      <p>{!vievCarrier[0] ? "" : vievCarrier[0].companyAdress}</p>
      <p>{!vievCarrier[0] ? "" : vievCarrier[0].vatNo}</p>
    </div>
  );

  const operationButtons = () => {
    if (!vievClient || !vievCarrier || !orderObject || !conditions) {
      return "";
    } else if (kindOfTask === "edit") {
      return (
        <SelectButton name="Aktualizuj zlecenie" onClick={handleOnEditOrder} />
      );
    } else if (!vievClient || vievCarrier || orderObject || conditions) {
      return (
        <>
          <SelectButton name="Wyczyść" onClick={handleClearOrder} />
          <SelectButton name="Zapisz" onClick={handleSaveOrder} />
        </>
      );
    }
  };

  const addOrChangeNameButton = !orderObject ? "dodaj" : "zmień";

  const spinner = showSpinner ? <Spinner /> : "";

  // set Conditions
  const handleAddConditionsModalOpen = () => {
    setAddConditionsModalOpen(true);
  };

  const titleOfPage = () => {
    if (!kindOfTask) {
      return "Dodawanie zlecenia";
    } else if (kindOfTask === "edit") {
      return "Edycja zlecenia ";
    } else if (kindOfTask === "copy") {
      return "Kopiowanie zlecenia";
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>{titleOfPage()}</h2>
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
          <table className={styles.dataInfoTable}>
            <tbody>
              <tr>
                <th></th>
                <th>Załadunek</th>
                <th>Rozładunek</th>
              </tr>
              <tr>
                <th>Data</th>
                <td>{!orderObject.loadDate ? "?" : orderObject.loadDate}</td>
                <td>
                  {!orderObject.unloadDate ? "?" : orderObject.unloadDate}
                </td>
              </tr>
              <tr>
                <th>Miejsce</th>
                <td>{!orderObject.loadCity ? "?" : orderObject.loadCity}</td>
                <td>
                  {!orderObject.unloadCity ? "?" : orderObject.unloadCity}
                </td>
              </tr>
            </tbody>
          </table>
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
          <tbody>
            <tr>
              <th></th>
              <th>Klient</th>
              <th>Przewoźnik</th>
            </tr>
            <tr>
              <th>Fracht</th>
              <td>
                {conditions.clientPrice}

                <span>{conditions.clientCurr}</span>
              </td>

              <td>
                {conditions.carrierPrice}
                <span>{conditions.carrierCurr}</span>
              </td>
            </tr>
            <tr>
              <th>Termin</th>

              <td>{conditions.clientTerms} dni</td>
              <td>{conditions.carrierTerms} dni</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.buttons}>
          <MainButton
            name={!conditions ? "dodaj" : "zmień"}
            onClick={handleAddConditionsModalOpen}
          />
          <MainButton name="cenniki" />
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
        orderObject={orderObject}
      />
      <AddConditionsForm
        isModalOpen={addConditionsModalOpen}
        handleOnClose={handleCloseModal}
        setConditions={setConditions}
      />
      <div className={styles.operationButtons}>
        {operationButtons()}
        <BackButton />
      </div>

      <div className={styles.spinnerWrapper}>{spinner}</div>
    </div>
  );
};

export default AddOrder;
