import { useContext } from "react";
import MainButton from "../../components/Buttons/MainButton/MainButton";

import request from "../../helpers/request";
import { StoreContext } from "../../Store/StoreProvider";

import styles from "./CustomerData.module.scss";

const CustomerData = ({ client, setClientRemoved }) => {
  const { setClientsData } = useContext(StoreContext);

  const handleDeleteClient = async () => {
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
      <div className={styles.item}>
        <p>adres:</p>
        <p>{client.companyAdress}</p>
      </div>
      <div className={styles.item}>
        <p>nip:</p>
        <p>{client.vatNo}</p>
      </div>
      <div className={styles.item}>
        <p>mail:</p>
        <p>{client.eMail}</p>
      </div>
      <div className={styles.item}>
        <p>uwagi:</p>
        <p>{client.info}</p>
      </div>

      <div className={styles.clientButtons}>
        <MainButton name="edytuj" />
        <MainButton name="usuń" onClick={handleDeleteClient} />
      </div>
    </div>
  );
};

export default CustomerData;
