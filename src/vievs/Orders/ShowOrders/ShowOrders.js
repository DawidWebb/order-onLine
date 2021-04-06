import { useEffect, useState, useContext } from "react";
import { Form, Field } from "react-final-form";

import SelectButton from "../../../components/Buttons/SelectButton/SelectButton";
import OrderObject from "./OrderObject";
import Spinner from "../../../components/Spinner/Spinner";
import InformationPopup from "../../../components/InformationPopup/InforationPopup";
import BackButton from "../../../components/Buttons/BackButton/BackButton";

import request from "../../../helpers/request";
import { StoreContext } from "../../../Store/StoreProvider";

import styles from "./ShowOrders.module.scss";

const ShowOrders = () => {
  const { ordersData, setOrdersData, user, cookie } = useContext(StoreContext);

  const [taskInformation, setTaskInformation] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const spinner = showSpinner ? <Spinner /> : "";

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (taskInformation) {
        setTaskInformation(false);
      }
    }, 2000);
    return () => clearInterval(timeout);
  }, [taskInformation]);

  //all clients from handleGetClients
  const ordersInfo = ordersData.map((order) => (
    <OrderObject
      key={order._id}
      order={order}
      setTaskInformation={setTaskInformation}
    />
  ));

  const handleGetOrders = async () => {
    // setSerchedClient(false);

    setShowSpinner(true);
    const { data, status } = await request.get(`/orders`);

    if (status === 200) {
      setShowSpinner(false);
      setOrdersData(data.data);
    } else {
      setShowSpinner(false);
      console.log(data.message);
    }
  };

  const handleSearchOrder = async (value) => {
    setShowSpinner(true);
    const { data, status } = await request.get(`/orders/${value.search}`);
    if (status === 200) {
      setOrdersData(data.data);
      setShowSpinner(false);
    } else {
      setTaskInformation(data.message);
      setShowSpinner(false);
    }
  };
  const getAllOrdersButton =
    ordersData.length === 0 ? (
      <SelectButton
        name="Lista zleceń"
        onClick={handleGetOrders}
        disabled={!cookie ? true : false}
      />
    ) : (
      <SelectButton
        name="odśwież listę"
        onClick={handleGetOrders}
        disabled={!cookie ? true : false}
      />
    );

  return (
    <div className={styles.wrapper}>
      <div className={styles.selectButtons}>
        {getAllOrdersButton}

        <Form
          onSubmit={handleSearchOrder}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <Field name="search">
                {({ input, meta }) => (
                  <div>
                    <input
                      {...input}
                      type="text"
                      placeholder="wpisz numer zlecenia"
                    />
                  </div>
                )}
              </Field>
              <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </button>
            </form>
          )}
        />

        <BackButton />
      </div>
      <div className={styles.addedOrder}></div>
      <div className={styles.ordersList}>{ordersInfo}</div>
      <div className={styles.spinner}>{spinner}</div>
      <div className={styles.informationPopup}>
        <InformationPopup taskInformation={taskInformation} />
      </div>
    </div>
  );
};

export default ShowOrders;
