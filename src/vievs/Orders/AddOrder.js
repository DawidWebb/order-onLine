import { useContext, useEffect, useState, useRef } from "react";
import { Form, Field } from "react-final-form";

import Spinner from "../../components/Spinner/Spinner";
import BackButton from "../../components/Buttons/BackButton/BackButton";
import MainButton from "../../components/Buttons/MainButton/MainButton";
import AddClientForm from "../../components/ClientModule/AddClientForm/AddClientForm";
import SerchModal from "../../components/ClientModule/SearchModal/SearchModal";
import InformationPopup from "../../components/InformationPopup/InforationPopup";

import request from "../../helpers/request";
import { StoreContext } from "../../Store/StoreProvider";

import styles from "./AddOrder.module.scss";

const AddOrder = () => {
  const { serchedClient } = useContext(StoreContext);

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [taskInformation, setTaskInformation] = useState(false);

  // const [addClient, setAddClient] = useState(false);

  const [selectedClient, setSelectedClient] = useState(false);
  const [selectedCarrier, setSelectedCarrier] = useState(false);

  const [vievClient, setVievClient] = useState(false);
  const [vievCarrier, setVievCarrier] = useState(false);

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (taskInformation) {
        setTaskInformation(false);
      }
    }, 2000);
    return () => clearInterval(timeout);
  }, [taskInformation]);

  // useEffect(() => {
  //   if (clientsData.length === 0) {
  //     return;
  //   } else {
  //     setAddClient(clientsData[clientsData.length - 1].companyName);
  //   }
  // }, [clientsData]);

  // useEffect(() => {
  //   setAddClient(false);
  // }, [serchedClient]);

  //client select

  const handleSearchClientModalOpen = () => {
    setSearchModalOpen(true);
    setSelectedClient(true);
  };

  const handleAddClientModalOpen = () => {
    setAddModalOpen(true);
    setSelectedClient(true);
  };

  // carrier select
  const handleSearchCarrierModalOpen = () => {
    setSearchModalOpen(true);
    setSelectedCarrier(true);
  };

  const handleAddCarrierModalOpen = () => {
    setAddModalOpen(true);
    setSelectedCarrier(true);
  };

  const handleCloseModal = () => {
    setAddModalOpen(false);
    setSearchModalOpen(false);
  };

  // const onSubmit = async (values) => {
  //   const orderObject = {};
  //   const { data, status } = await request.post("/orders", orderObject);

  //   if (status === 201) {
  //     console.log("add");
  //   } else if (status === 409) {
  //   } else {
  //     console.log(data.message);
  //   }
  // };

  return (
    <div className={styles.wrapper}>
      <div className={styles.client}>
        <div className={styles.buttons}>
          <h3>Klient</h3>
          <MainButton name="pobierz" onClick={handleSearchClientModalOpen} />
          <MainButton name="dodaj" onClick={handleAddClientModalOpen} />
        </div>
        <div className={styles.clientData}>
          {!vievClient ? "" : vievClient[0].companyName}
        </div>
      </div>
      <div className={styles.carrier}>
        <div className={styles.buttons}>
          <h3>Przewoźnik</h3>
          <MainButton name="pobierz" onClick={handleSearchCarrierModalOpen} />
          <MainButton name="dodaj" onClick={handleAddCarrierModalOpen} />
        </div>
        <div className={styles.carrierData}>
          {!vievCarrier ? "" : vievCarrier[0].companyName}
        </div>
      </div>
      <div className={styles.order}>
        <div className={styles.buttons}>
          <h3>Zlecenie</h3>
          <MainButton name="dodaj" />
          <MainButton name="model" />
        </div>
        <div className={styles.orderData}></div>
      </div>
      <div className={styles.backButton}>
        <BackButton />
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
    </div>
  );
};

export default AddOrder;
