import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import MainSection from "../../vievs/MainSection/MainSection";
import TestFormSection from "../../vievs/FormSection/TestFormSection";
import FormSection from "../../vievs/FormSection/FormSection";

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
        {user && (
          <Route exact path="/app-form" render={() => <FormSection />} />
        )}

        {/* <Route component={ErrorPage} /> */}
        <Redirect to="/" />
      </Switch>
    </main>
  );
};
export default MainSwitch;
