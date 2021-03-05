import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import MainSection from "../../vievs/MainSection/MainSection";
import TestFormSection from "../../vievs/FormSection/TestFormSection";
import Orders from "../../vievs/Orders/Orders";
import AddOrder from "../../vievs/Orders/AddOrder/AddOrder";
import ShowOrders from "../../vievs/Orders/ShowOrders/ShowOrders";
import Customers from "../../vievs/Customers/Customers";

import { StoreContext } from "../../Store/StoreProvider";
// import ErrorPage from "../ErrorPage/ErrorPage";

const MainSwitch = () => {
  const { user, cookie } = useContext(StoreContext);

  return (
    <main>
      <Switch>
        <Route exact path="/" render={() => <MainSection />} />
        <Route exact path="/test-form" render={() => <TestFormSection />} />
        {user || cookie ? (
          <Route exact path="/orders" render={() => <Orders />} />
        ) : (
          ""
        )}
        {user || cookie ? (
          <Route exact path="/customers" render={() => <Customers />} />
        ) : (
          ""
        )}
        {user || cookie ? (
          <Route exact path="/addorder" render={() => <AddOrder />} />
        ) : (
          ""
        )}
        {user || cookie ? (
          <Route exact path="/showorders" render={() => <ShowOrders />} />
        ) : (
          ""
        )}
        {/* <Route component={ErrorPage} /> */}
        <Redirect to="/" />
      </Switch>
    </main>
  );
};
export default MainSwitch;
