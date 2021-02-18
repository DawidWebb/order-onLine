import { useContext } from "react";

import { Link } from "react-router-dom";

import AddClientForm from "../../components/AddClientForm/AddClientForm";
import { StoreContext } from "../../Store/StoreProvider";

const LoggedMenu = () => {
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
    <div>
      <Link to="/app-form">Dodaj zlecenie</Link>
      <button onClick={handleModalOpen}>Dodaj kontrahenta</button>
      <AddClientForm
        isModalOpen={addClientModalOpen}
        handleOnClose={handleCloseModal}
      />
      <button>Lista Zleceń</button>
      <button>Lista Kontrahentów</button>
    </div>
  );
};

export default LoggedMenu;
