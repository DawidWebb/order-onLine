import { Switch, Route } from "react-router-dom";

import MainSection from "../../vievs/MainSection/MainSection";
import FormSection from "../../vievs/FormSection/FormSection";

// import ErrorPage from "../ErrorPage/ErrorPage";

function MainSwitch() {
  return (
    <>
      <Switch>
        <Route path="/" exact component={MainSection} />
        <Route path="/test-form" exact component={FormSection} />

        {/* <Route component={ErrorPage} /> */}
      </Switch>
    </>
  );
}
export default MainSwitch;
