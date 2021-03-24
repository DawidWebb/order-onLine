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
  const { ordersData, setOrdersData } = useContext(StoreContext);

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

  const handleGetOrders = async (values) => {
    // setSerchedClient(false);

    setShowSpinner(true);
    const { data, status } = await request.get("/orders");

    if (status === 200) {
      setShowSpinner(false);
      setOrdersData(data.data);
    } else {
      setShowSpinner(false);
      console.log(data.message);
    }
  };

  // const handleOnSubmit = async () => {
  //   const { data, status } = await request.get("/orders/search");
  //   if (status === 200) {
  //     console.log(data);
  //   } else {
  //     console.log(data.message);
  //   }
  // };
  const getAllOrdersButton =
    ordersData.length === 0 ? (
      <SelectButton name="Lista zleceń" onClick={handleGetOrders} />
    ) : (
      <SelectButton name="odśwież listę" onClick={handleGetOrders} />
    );

  return (
    <div className={styles.wrapper}>
      <div className={styles.selectButtons}>
        {getAllOrdersButton}
        <Form
          onSubmit={handleGetOrders}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <Field name="search">
                {({ input, meta }) => (
                  <div>
                    <input {...input} type="text" />
                  </div>
                )}
              </Field>
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
