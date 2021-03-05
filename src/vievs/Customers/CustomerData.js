import { useContext, useState } from "react";
import MainButton from "../../components/Buttons/MainButton/MainButton";
import EditClientForm from "../../components/ClientModule/EditClientForm/EditClientForm";
import DeleteConfirmation from "../../components/DeleteConfirmation/DeleteConfirrmation";

import request from "../../helpers/request";
import { StoreContext } from "../../Store/StoreProvider";

import styles from "./CustomerData.module.scss";

const CustomerData = ({ client, setTaskInformation }) => {
  const { setClientsData, serchedClient, setSerchedClient } = useContext(
    StoreContext
  );
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const handleModalOpen = (e) => {
    setEditModalOpen(true);
  };
  const handleCloseModal = () => {
    setEditModalOpen(false);
    setConfirmationModalOpen(false);
  };

  const handleDeleteClient = () => {
    setConfirmationModalOpen(true);
  };

  const deleteConfirm = async () => {
    try {
      const { status } = await request.delete(`/clients/${client._id}`);

      if (status === 200) {
        setClientsData((prev) =>
          prev.filter((item) => item._id !== client._id)
        );
        if (serchedClient) {
          setSerchedClient(false);
        }
        setTaskInformation("Usunięto klienta");
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
          setTaskInformation={setTaskInformation}
          clientData={client}
        />
        <MainButton name="usuń" onClick={handleDeleteClient} />
      </div>
      <div className={styles.deleteConfirmationPopup}>
        <DeleteConfirmation
          confirmationModalOpen={confirmationModalOpen}
          deleteConfirm={deleteConfirm}
          handleCloseModal={handleCloseModal}
        />
      </div>
    </div>
  );
};

export default CustomerData;
