import { useContext, useState } from "react";
import MainButton from "../../components/Buttons/MainButton/MainButton";
import EditClientForm from "../../components/EditClientForm/EditClientForm";

import request from "../../helpers/request";
import { StoreContext } from "../../Store/StoreProvider";

import styles from "./CustomerData.module.scss";

const CustomerData = ({
  client,
  setClientRemoved,
  setClientEdited,
  setSerchedClient,
}) => {
  const { setClientsData } = useContext(StoreContext);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleModalOpen = (e) => {
    setEditModalOpen(true);
  };
  const handleCloseModal = () => {
    setEditModalOpen(false);
  };

  const handleDeleteClient = async () => {
    try {
      const { status } = await request.delete(`/clients/${client._id}`);

      if (status === 200) {
        setClientsData((prev) =>
          prev.filter((item) => item._id !== client._id)
        );
        setSerchedClient(false);
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
        <MainButton name="edytuj" onClick={handleModalOpen} />
        <EditClientForm
          isModalOpen={editModalOpen}
          handleOnClose={handleCloseModal}
          setClientEdited={setClientEdited}
          setSerchedClient={setSerchedClient}
          clientData={client}
        />
        <MainButton name="usuń" onClick={handleDeleteClient} />
      </div>
    </div>
  );
};

export default CustomerData;
