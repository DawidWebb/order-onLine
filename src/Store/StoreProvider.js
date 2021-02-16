import React, { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  //Modal Rodo Viev
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  return (
    <StoreContext.Provider value={{ loginModalOpen, setLoginModalOpen }}>
      {children}
    </StoreContext.Provider>
  );
};
export default StoreProvider;
