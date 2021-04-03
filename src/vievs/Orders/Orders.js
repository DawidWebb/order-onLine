import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SelectButton from "../../components/Buttons/SelectButton/SelectButton";
import BackButton from "../../components/Buttons/BackButton/BackButton";
import AddClientForm from "../../components/ClientModule/AddClientForm/AddClientForm";
import InformationPopup from "../../components/InformationPopup/InforationPopup";

import { StoreContext } from "../../Store/StoreProvider";

import styles from "./Orders.module.scss";

const Orders = () => {
  const {
    setCopiedOrderData,
    user,
    cookie,
    addClientModalOpen,
    setAddClientModalOpen,
  } = useContext(StoreContext);

  const [taskInformation, setTaskInformation] = useState("");

  const handleResetOrder = () => {
    setCopiedOrderData();
  };

  const handleAddCompanyProfile = () => {
    setAddClientModalOpen(true);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (taskInformation) {
        setTaskInformation(false);
      }
    }, 2000);
    return () => clearInterval(timeout);
  }, [taskInformation]);

  const handleOnClose = () => {
    setAddClientModalOpen(false);
  };
  return (
    <div className={styles.wrapper}>
      <h1>Moduł zlecenia</h1>
      <div className={styles.selectButttons}>
        <Link to="addorder">
          <SelectButton name="dodaj zlecenie" onClick={handleResetOrder} />
        </Link>
        {user || cookie ? (
          <Link to="showorders">
            <SelectButton name="pokaż zlecenia" />
          </Link>
        ) : (
          <SelectButton name="pokaż zlecenia" disabled />
        )}

        <SelectButton
          name="parametry firmy"
          onClick={handleAddCompanyProfile}
        />
        <AddClientForm
          isModalOpen={addClientModalOpen}
          handleOnClose={handleOnClose}
          thisIsCompanyProfile={true}
          setTaskInformation={setTaskInformation}
        />
        <BackButton />
        <InformationPopup taskInformation={taskInformation} />
      </div>
    </div>
  );
};

export default Orders;
