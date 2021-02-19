import React, { createContext, useEffect, useState } from "react";
import request from "../helpers/request";

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  // login Modal viev
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // user login
  const [user, setUser] = useState(null);

  // AddClientModal viev
  const [addClientModalOpen, setAddClientModalOpen] = useState(null);

  // Get all clients
  const [clients, setClients] = useState([]);

  const fetchData = async () => {
    const { data } = await request.get("/clients");

    setClients(data.clients);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <StoreContext.Provider
      value={{
        loginModalOpen,
        setLoginModalOpen,
        user,
        setUser,
        addClientModalOpen,
        setAddClientModalOpen,
        clients,
        setClients,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export default StoreProvider;
