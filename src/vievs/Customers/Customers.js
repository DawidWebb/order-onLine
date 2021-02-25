import { useContext, useEffect, useState } from "react";

import AddClientForm from "../../components/AddClientForm/AddClientForm";
import SearchModal from "../../components/SearchModal/SearchModal";
import SelectButton from "../../components/Buttons/SelectButton/SelectButton";
import BackButton from "../../components/Buttons/BackButton/BackButton";
import Spinner from "../../components/Spinner/Spinner";
import CustomerData from "./CustomerData";

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

  const [clientAdded, setClientAdded] = useState(false);
  const [clientEdited, setClientEdited] = useState(false);
  const [clientRemoved, setClientRemoved] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [serchedClient, setSerchedClient] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const showInformationAdded = clientAdded ? "Dodano nowego klienta" : "";
  const showInformationRemoved = clientRemoved ? "Usunieto klienta" : "";

  const spinner = showSpinner ? <Spinner /> : "";

  //all clients from handleGetClients
  const clientsInfo = clientsData.map((client) => (
    <CustomerData
      key={client._id}
      client={client}
      setClientRemoved={setClientRemoved}
      setClientEdited={setClientEdited}
    />
  ));

  //one client from search
  const serchClientInfo = !serchedClient ? (
    ""
  ) : (
    <CustomerData
      key={serchedClient[0]._id}
      client={serchedClient[0]}
      setSerchedClient={setSerchedClient}
      setClientRemoved={setClientRemoved}
      setClientEdited={setClientEdited}
    />
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setClientAdded(false);
      setClientRemoved(false);
      setClientEdited(false);
    });
    return () => clearInterval(timeout);
  }, [clientAdded, clientRemoved, clientEdited]);

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
      <div className={styles.information}>
        <p>{showInformationAdded}</p>
        <p>{showInformationRemoved}</p>
      </div>
      <div className={styles.selectButttons}>
        <SelectButton name="dodaj kontrahenta" onClick={handleModalOpen} />
        <AddClientForm
          isModalOpen={addClientModalOpen}
          handleOnClose={handleCloseModal}
          setClientAdded={setClientAdded}
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
