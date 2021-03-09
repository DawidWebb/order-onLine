import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Spinner from "../../../components/Spinner/Spinner";
import MainButton from "../../../components/Buttons/MainButton/MainButton";
import SelectButton from "../../../components/Buttons/SelectButton/SelectButton";
import BackButton from "../../../components/Buttons/BackButton/BackButton";
import AddClientForm from "../../../components/ClientModule/AddClientForm/AddClientForm";
import SerchModal from "../../../components/ClientModule/SearchModal/SearchModal";
import InformationPopup from "../../../components/InformationPopup/InforationPopup";
import OrderObject from "../ShowOrders/OrderObject";

import request from "../../../helpers/request";
import { StoreContext } from "../../../Store/StoreProvider";

import styles from "./OrderAdedd.module.scss";

const OrderAdedd = () => {
  let history = useHistory();

  const { ordersData } = useContext(StoreContext);
  const oneOrderData = ordersData[ordersData.length - 1];
  console.log(oneOrderData._id);
  const [taskInformation, setTaskInformation] = useState("Dodano Zlecenie");

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (taskInformation) {
        setTaskInformation(false);
      }
    }, 2000);
    return () => clearInterval(timeout);
  }, [taskInformation]);

  const handleGoToStart = () => {
    history.push("./");
  };
  const handleGoToOrdersList = () => {
    history.push("./showorders");
  };
  const handleGoToAddOrder = () => {
    history.push("./addorder");
  };
  return (
    <div className={styles.wrapper}>
      <OrderObject
        order={oneOrderData}
        setTaskInformation={setTaskInformation}
      />
      <div className={styles.informationPopup}>
        <InformationPopup taskInformation={taskInformation} />
      </div>
      <SelectButton name="dodaj nowe zlecenie" onClick={handleGoToAddOrder} />
      <SelectButton name="lista zleceń" onClick={handleGoToOrdersList} />
      <SelectButton name="powrót do stony głównej" onClick={handleGoToStart} />
    </div>
  );
};

export default OrderAdedd;
