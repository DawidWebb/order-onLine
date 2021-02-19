import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import MainSection from "../../vievs/MainSection/MainSection";
import TestFormSection from "../../vievs/FormSection/TestFormSection";
import Orders from "../../vievs/Orders/Orders";
import Customers from "../../vievs/Customers/Customers";

import { StoreContext } from "../../Store/StoreProvider";
// import ErrorPage from "../ErrorPage/ErrorPage";

const MainSwitch = () => {
  const { user } = useContext(StoreContext);

  console.log(user);

  return (
    <main>
      <Switch>
        <Route exact path="/" render={() => <MainSection />} />
        <Route exact path="/test-form" render={() => <TestFormSection />} />
        {user && <Route exact path="/orders" render={() => <Orders />} />}
        {user && <Route exact path="/customers" render={() => <Customers />} />}

        {/* <Route component={ErrorPage} /> */}
        <Redirect to="/" />
      </Switch>
    </main>
  );
};
export default MainSwitch;
