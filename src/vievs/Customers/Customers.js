import { useContext } from "react";

import AddClientForm from "../../components/AddClientForm/AddClientForm";
import BackButton from "../../components/Buttons/BackButton/BackButton";

import { StoreContext } from "../../Store/StoreProvider";

import styles from "./Customers.module.scss";

const Customers = () => {
  const { addClientModalOpen, setAddClientModalOpen } = useContext(
    StoreContext
  );

  const handleModalOpen = () => {
    setAddClientModalOpen(true);
  };

  const handleCloseModal = () => {
    setAddClientModalOpen(false);
  };
  return (
    <div className={styles.wrapper}>
      <button onClick={handleModalOpen}>Dodaj kontrahenta</button>
      <AddClientForm
        isModalOpen={addClientModalOpen}
        handleOnClose={handleCloseModal}
      />
      <button>Wyszukaj kontrahenta</button>
      <button>Lista Kontrahentów</button>
      <BackButton />
    </div>
  );
};

export default Customers;
