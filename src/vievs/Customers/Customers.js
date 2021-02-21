import { useContext, useEffect, useState } from "react";

import AddClientForm from "../../components/AddClientForm/AddClientForm";
import MainButton from "../../components/Buttons/MainButton/MainButton";
import BackButton from "../../components/Buttons/BackButton/BackButton";
import Spinner from "../../components/Spinner/Spinner";

import request from "../../helpers/request";
import { StoreContext } from "../../Store/StoreProvider";

import styles from "./Customers.module.scss";

const Customers = () => {
  const {
    addClientModalOpen,
    setAddClientModalOpen,
    clientAdded,
    setClientAdded,
    showSpinner,
    setShowSpinner,
  } = useContext(StoreContext);

  const [clientsData, setClientsData] = useState([]);

  const showInformation = clientAdded ? "Dodano nowego klienta" : "";
  const spinner = showSpinner ? <Spinner /> : "";

  //all clients from handleGetClients
  const clientsInfo = clientsData.map((client) => (
    <div key={client._id} className={styles.clientItem}>
      <h3>{client.companyName}</h3>
      <p>
        adres: <span>{client.companyAdress}</span>
      </p>
      <p>
        nip: <span>{client.vatNo}</span>
      </p>
      <p>
        mail: <span>{client.eMail}</span>
      </p>
      <p>
        uwagi: <span>{client.info}</span>
      </p>
      <div className={styles.clientButtons}>
        <button>Edytuj</button>
        <button onClick={handleDeleteClient} id={client.vatNo}>
          Usuń
        </button>
      </div>
    </div>
  ));

  useEffect(() => {
    const timeout = setTimeout(() => {
      setClientAdded(false);
    }, 3000);

    return () => clearInterval(timeout);
  }, [clientAdded]);

  const handleModalOpen = () => {
    setAddClientModalOpen(true);
  };

  const handleCloseModal = () => {
    setAddClientModalOpen(false);
  };

  const handleSerchModalOpen = () => {};

  const handleGetClients = async () => {
    setShowSpinner(true);
    const { data, status } = await request.get("/clients");
    console.log(status);
    if (status === 200) {
      setShowSpinner(false);
      setClientsData(data.data);
    } else {
      setShowSpinner(false);
      console.log(data.message);
    }
  };

  const handleDeleteClient = async (e) => {
    try {
      const { status } = await request.delete(`/courses/${e.target.id}`);

      if (status === 200) {
        setClientsData((prev) =>
          prev.filter((client) => client.vatNo !== e.target.id)
        );
      }
    } catch (error) {
      console.warn("cos nie taK");
    }
  };
  return (
    <div className={styles.wrapper}>
      <h1>Moduł klienta</h1>
      <div className={styles.information}>
        <p>{showInformation}</p>
      </div>
      <div className={styles.selectButttons}>
        <MainButton name="dodaj kontrahenta" onClick={handleModalOpen} />
        <AddClientForm
          isModalOpen={addClientModalOpen}
          handleOnClose={handleCloseModal}
        />
        <MainButton
          name="wyszukaj kontrahenta"
          onClick={handleSerchModalOpen}
        />
        <MainButton name="lista kontrahentów" onClick={handleGetClients} />
      </div>
      {spinner}
      <div className={styles.clientsList}>{clientsInfo}</div>
      <div className={styles.backButton}>
        <BackButton />
      </div>
    </div>
  );
};

export default Customers;
