import { useContext } from "react";

import request from "../../helpers/request";
import { StoreContext } from "../../Store/StoreProvider";

import styles from "./CustomerData.module.scss";

const CustomerData = ({ client, setClientRemoved }) => {
  const { setClientsData } = useContext(StoreContext);

  const handleDeleteClient = async (e) => {
    try {
      console.log(client._id);
      const { status } = await request.delete(`/clients/${client._id}`);

      if (status === 200) {
        setClientsData((prev) =>
          prev.filter((item) => item._id !== client._id)
        );
        setClientRemoved(true);
      }
    } catch (error) {
      console.warn("cos nie taK");
    }
  };
  return (
    <div className={styles.clientData}>
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
  );
};

export default CustomerData;
