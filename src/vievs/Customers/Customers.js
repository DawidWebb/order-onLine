import { useContext, useEffect, useState } from "react";

import AddClientForm from "../../components/ClientModule/AddClientForm/AddClientForm";
import SearchModal from "../../components/ClientModule/SearchModal/SearchModal";
import SelectButton from "../../components/Buttons/SelectButton/SelectButton";
import BackButton from "../../components/Buttons/BackButton/BackButton";
import Spinner from "../../components/Spinner/Spinner";
import CustomerData from "./CustomerData";
import InformationPopup from "../../components/InformationPopup/InforationPopup";

import request from "../../helpers/request";
import { StoreContext } from "../../Store/StoreProvider";

import styles from "./Customers.module.scss";

const Customers = () => {
  const {
    clientsData,
    setClientsData,
    addClientModalOpen,
    setAddClientModalOpen,
  } = useContext(StoreContext);

  const [taskInformation, setTaskInformation] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [serchedClient, setSerchedClient] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const spinner = showSpinner ? <Spinner /> : "";

  //all clients from handleGetClients
  const clientsInfo = clientsData.map((client) => (
    <CustomerData
      key={client._id}
      client={client}
      setTaskInformation={setTaskInformation}
    />
  ));

  //one client from search
  const serchClientInfo = !serchedClient ? (
    ""
  ) : (
    <CustomerData
      key={serchedClient[0]._id}
      client={serchedClient[0]}
      serchedClient={serchedClient}
      setSerchedClient={setSerchedClient}
      setTaskInformation={setTaskInformation}
    />
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (taskInformation) {
        setTaskInformation(false);
      }
    }, 2000);
    return () => clearInterval(timeout);
  }, [taskInformation]);

  const handleModalOpen = () => {
    setAddClientModalOpen(true);
    setSerchedClient(false);
  };

  const handleCloseModal = () => {
    setAddClientModalOpen(false);
    setSearchModalOpen(false);
  };

  const handleSerchModalOpen = () => {
    setSearchModalOpen(true);
  };

  const handleGetClients = async () => {
    setSerchedClient(false);
    setShowSpinner(true);
    const { data, status } = await request.get("/clients");

    if (status === 200) {
      setShowSpinner(false);
      setClientsData(data.data);
    } else {
      setShowSpinner(false);
      console.log(data.message);
    }
  };
  const getAllClientsButton =
    clientsData.length === 0 ? (
      <SelectButton name="lista kontrahentów" onClick={handleGetClients} />
    ) : (
      <SelectButton name="odśwież listę" onClick={handleGetClients} />
    );

  return (
    <div className={styles.wrapper}>
      <h1>Moduł klienta</h1>
      <div className={styles.information}></div>
      <div className={styles.selectButttons}>
        <SelectButton name="dodaj kontrahenta" onClick={handleModalOpen} />
        <AddClientForm
          isModalOpen={addClientModalOpen}
          handleOnClose={handleCloseModal}
          setTaskInformation={setTaskInformation}
        />
        <SelectButton
          name="wyszukaj kontrahenta"
          onClick={handleSerchModalOpen}
        />
        <SearchModal
          isModalOpen={searchModalOpen}
          handleCloseModal={handleCloseModal}
          setSerchedClient={setSerchedClient}
        />
        {getAllClientsButton}
      </div>
      <div className={styles.spinnerWrapper}> {spinner}</div>
      <div className={styles.informationPopup}>
        <InformationPopup taskInformation={taskInformation} />
      </div>
      <div className={styles.clientItem}>{serchClientInfo}</div>
      <div className={styles.clientsList}>
        {!serchClientInfo ? clientsInfo : ""}
      </div>
      <div className={styles.backButton}>
        <BackButton />
      </div>
    </div>
  );
};

export default Customers;
