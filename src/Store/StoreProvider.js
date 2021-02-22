import React, { createContext, useEffect, useState } from "react";
import request from "../helpers/request";

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  // login Modal viev
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // show Spinner
  const [showSpinner, setShowSpinner] = useState(false);

  // user login
  const [user, setUser] = useState(null);

  // AddClientModal viev
  const [addClientModalOpen, setAddClientModalOpen] = useState(null);

  // SerchModalOpen viev
  const [searchModalOpen, settSearchModalOpen] = useState(null);

  // Get all clients - method implement on Customers.js
  const [clientsData, setClientsData] = useState([]);

  return (
    <StoreContext.Provider
      value={{
        loginModalOpen,
        setLoginModalOpen,
        showSpinner,
        setShowSpinner,
        user,
        setUser,
        addClientModalOpen,
        setAddClientModalOpen,
        searchModalOpen,
        settSearchModalOpen,
        clientsData,
        setClientsData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export default StoreProvider;
