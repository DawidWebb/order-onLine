import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import OrderPrintViev from "../../components/AppFormModule/OrderPrintViev/OrderPrintViev";
import MainSection from "../../vievs/MainSection/MainSection";
import Rodo from "../../vievs/AdditionalInformations/Rodo";
import Instruction from "../../vievs/AdditionalInformations/Instruction";
import TestFormSection from "../../vievs/FormSection/TestFormSection";
import Orders from "../../vievs/Orders/Orders";
import AddOrder from "../../vievs/Orders/AddOrder/AddOrder";
import AddTestOrder from "../../vievs/FormSection/AddTestOrder/AddTestOrder";
import ShowOrders from "../../vievs/Orders/ShowOrders/ShowOrders";
import Customers from "../../vievs/Customers/Customers";

import { StoreContext } from "../../Store/StoreProvider";
// import ErrorPage from "../ErrorPage/ErrorPage";

const MainSwitch = () => {
  const { user, cookie } = useContext(StoreContext);

  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <MainSection />} />
        <Route exact path="/rodo" render={() => <Rodo />} />
        <Route exact path="/instruction" render={() => <Instruction />} />
        <Route exact path="/test-form" render={() => <TestFormSection />} />
        <Route exact path="/order-print" render={() => <OrderPrintViev />} />
        <Route exact path="/orders" render={() => <Orders />} />

        {user || cookie ? (
          <Route exact path="/customers" render={() => <Customers />} />
        ) : (
          ""
        )}
        {user || cookie ? (
          <Route exact path="/addorder" render={() => <AddOrder />} />
        ) : (
          <Route exact path="/addorder" render={() => <AddTestOrder />} />
        )}

        <Route exact path="/showorders" render={() => <ShowOrders />} />

        {/* <Route component={ErrorPage} /> */}
        <Redirect to="/" />
      </Switch>
    </>
  );
};
export default MainSwitch;
