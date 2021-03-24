import React, { createContext, useEffect, useState } from "react";
import request from "../helpers/request";

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  // order Number
  const [orderNumber, setOrderNumber] = useState();
  const OrderNo = async () => {
    const { data, status } = await request.get("/orders");

    if (status === 200) {
      setOrderNumber(data.data.length);
    } else {
      console.log(data.message);
    }
  };
  useEffect(() => {
    OrderNo();
  }, []);

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
        orderNumber,
        setOrderNumber,
        printOrderData,
        setPrintOrderData,
        copiedOrderData,
        setCopiedOrderData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export default StoreProvider;
