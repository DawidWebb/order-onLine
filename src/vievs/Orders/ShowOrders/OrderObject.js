import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import MainButton from "../../../components/Buttons/MainButton/MainButton";
import DeleteConfirmation from "../../../components/DeleteConfirmation/DeleteConfirrmation";

import request from "../../../helpers/request";
import { StoreContext } from "../../../Store/StoreProvider";

import styles from "./OrderObject.module.scss";

const OrderObject = ({ order, setTaskInformation }) => {
  let history = useHistory();

  const { ordersData, setOrdersData, setPrintOrderData } = useContext(
    StoreContext
  );

  const [showDetails, setShowDetails] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const {
    carrierAdress,
    carrierName,
    carrierVatNo,
    clientAdress,
    clientName,
    clientVatNo,
    _id,
    orderDriver,
    orderFix,
    orderAdr,
    orderGoodsSpecyfications,
    orderLoadDate,
    orderLoadHrs,
    orderLoadCountry,
    orderLoadZip,
    orderLoadCity,
    orderLoadAdress,
    orderNumber,
    orderTruck,
    orderUnloadAdress,
    orderUnloadCountry,
    orderUnloadZip,
    orderUnloadCity,
    orderUnloadDate,
    orderUnloadHrs,
    orderInfo,
    orderClientPrice,
    orderClientCurr,
    orderClientTerms,
    orderCarrierPrice,
    orderCarrierCurr,
    orderCarrierTerms,
  } = order;

  // managment of show/hide details of order

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const showDetailsButton = !showDetails ? (
    <MainButton name="szczegóły" onClick={handleShowDetails} />
  ) : (
    <MainButton name="ukryj" onClick={handleShowDetails} />
  );
  // odred details after clickshowDetails Button
  const showDetailsOrder = !showDetails ? (
    ""
  ) : (
    <>
      <div className={styles.item}>
        <p>załadunek: </p>
        <p>{orderLoadDate}</p>
        <p>{orderLoadHrs}</p>
        <p>{orderLoadCountry}</p>
        <p>{orderLoadZip}</p>
        <p>{orderLoadCity}</p>
        <p>{orderLoadAdress}</p>
      </div>
      <div className={styles.item}>
        <p>rozładunek: </p>
        <p>{orderUnloadDate}</p>
        <p>{orderUnloadHrs}</p>
        <p>{orderUnloadCountry}</p>
        <p>{orderUnloadZip}</p>
        <p>{orderUnloadCity}</p>
        <p>{orderUnloadAdress}</p>
      </div>
      <div className={styles.item}>
        <p>ładunek: </p>
        <p>{orderGoodsSpecyfications}</p>
      </div>
      <div className={styles.item}>
        <p>kierowca: </p>
        <p>{orderDriver}</p>
        <p>pojazd: </p>
        <p>{orderTruck}</p>
      </div>
      <div className={styles.item}>
        <p>{orderFix}</p>
        <p>{orderAdr}</p>
      </div>
      <div className={styles.item}>
        <p>info:</p>
        <span>{orderInfo}</span>
      </div>
      <div className={styles.item}>
        <p>Warunki i terminy:</p>
        <p>fracht klienta:</p>
        <span>{`${orderClientPrice} ${orderClientCurr}`}</span>
        <p>termin klienta:</p>
        <span>{orderClientTerms}</span>
        <p>fracht przewoźnika:</p>
        <span>{`${orderCarrierPrice} ${orderCarrierCurr}`}</span>
        <p>termin przewoźnika:</p>
        <span>{orderCarrierTerms}</span>
      </div>
    </>
  );

  const handleCloseModal = () => {
    // setEditModalOpen(false);
    setConfirmationModalOpen(false);
  };

  // delete order
  const handleDeleteOrder = () => {
    setConfirmationModalOpen(true);
  };

  const deleteConfirm = async () => {
    try {
      const { status } = await request.delete(`/orders/${_id}`);
      console.log(status);
      if (status === 200) {
        setOrdersData((prev) => prev.filter((item) => item._id !== _id));

        // if (serchedClient) {
        //   setSerchedClient(false);
        // }
        setTaskInformation("Usunięto zlecenie");
      }
    } catch (error) {
      console.warn("cos nie taK");
    }
  };
  const deleteButton = !_id ? (
    ""
  ) : (
    <MainButton name="usuń" onClick={handleDeleteOrder} />
  );

  //Print order
  const handleOnPrint = () => {
    history.push("/order-print");
    setPrintOrderData(order);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.item}>
        <p>Nr zlecenia:</p>
        <p>{orderNumber}</p>
      </div>
      <div className={styles.item}>
        <p>Klient:</p>
        <p>{clientName}</p>
        <MainButton name="edytuj" />
      </div>
      <div className={styles.item}>
        <p>Przewoźnik:</p>
        <p>{carrierName}</p>
        <MainButton name="edytuj" />
      </div>
      <div className={styles.orderData}>
        <h3>dane zlecenia</h3>
        <MainButton name="edytuj" />
        <div className={styles.item}>
          <h3>Trasa:</h3>
          <h3>{orderLoadCity}</h3>
          <h3>{orderUnloadCity}</h3>
        </div>

        {showDetailsOrder}
      </div>
      <div className={styles.buttons}>
        {showDetailsButton}
        <MainButton
          name="drukuj zlecenie dla przewoźnika"
          onClick={handleOnPrint}
        />
        {deleteButton}
      </div>
      <DeleteConfirmation
        confirmationModalOpen={confirmationModalOpen}
        deleteConfirm={deleteConfirm}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default OrderObject;
