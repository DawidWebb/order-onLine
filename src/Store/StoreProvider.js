import React, { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  // login Modal viev
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // user login
  const [user, setUser] = useState(null);

  // AddClientModal viev
  const [addClientModalOpen, setAddClientModalOpen] = useState(null);
  return (
    <StoreContext.Provider
      value={{
        loginModalOpen,
        setLoginModalOpen,
        user,
        setUser,
        addClientModalOpen,
        setAddClientModalOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export default StoreProvider;
