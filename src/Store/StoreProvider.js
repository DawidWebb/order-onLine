import React, { createContext, useEffect, useState } from "react";

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
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export default StoreProvider;
