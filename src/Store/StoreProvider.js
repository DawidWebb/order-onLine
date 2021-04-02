import React, { createContext, useEffect, useState } from "react";
import request from "../helpers/request";

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  // login Modal viev
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // user login
  const [user, setUser] = useState(null);

  // cookie
  const [cookie, setCookie] = useState(false);
  const checkCookie = () => {
    if (document.cookie === "appFormAdmin") {
      setCookie("appFormAdmin");
    }
  };
  useEffect(() => {
    checkCookie();
  }, []);

  // manage order number
  const [currentOrderNumber, setCurentOrderNumber] = useState();
  const [newOrderNumber, setNewOdredNumber] = useState();

  const getCurrentOrderNumber = async () => {
    const { data, status } = await request.get("/ordernumber");
    if (status === 200) {
      setCurentOrderNumber(data.data[0]);
      console.log(data.data[0]);
    } else {
      console.log(status, data.message);
    }
  };

  useEffect(() => {
    getCurrentOrderNumber();
  }, [newOrderNumber]);

  // AddClientModal viev
  const [addClientModalOpen, setAddClientModalOpen] = useState(null);

  // SerchModalOpen viev
  const [searchModalOpen, settSearchModalOpen] = useState(null);

  // Get all clients - method implement on Customers.js
  const [clientsData, setClientsData] = useState([]);

  // Serched client data
  const [serchedClient, setSerchedClient] = useState(null);

  // Get all orders method implement on ShowOrders.js
  const [ordersData, setOrdersData] = useState([]);

  // Data for copied order
  const [copiedOrderData, setCopiedOrderData] = useState(false);

  // data for OrderPrintViev
  const [printOrderData, setPrintOrderData] = useState(false);

  // swich betwwen copy and edit tasks
  const [kindOfTask, setKindOfTask] = useState(false);

  return (
    <StoreContext.Provider
      value={{
        loginModalOpen,
        setLoginModalOpen,
        cookie,
        setCookie,
        user,
        setUser,
        addClientModalOpen,
        setAddClientModalOpen,
        searchModalOpen,
        settSearchModalOpen,
        clientsData,
        setClientsData,
        serchedClient,
        setSerchedClient,
        ordersData,
        setOrdersData,
        printOrderData,
        setPrintOrderData,
        copiedOrderData,
        setCopiedOrderData,
        kindOfTask,
        setKindOfTask,
        currentOrderNumber,
        setCurentOrderNumber,
        newOrderNumber,
        setNewOdredNumber,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export default StoreProvider;
