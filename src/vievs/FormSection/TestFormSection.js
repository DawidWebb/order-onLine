import { Link } from "react-router-dom";

import BackButton from "../../components/Buttons/BackButton/BackButton";
import SelectButton from "../../components/Buttons/SelectButton/SelectButton";

import styles from "./testFormSection.module.scss";

function TestFormSection() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.buttons}>
        <Link to="/orders">
          <SelectButton name="zlecenia" />
        </Link>
        <SelectButton name="klienci" disabled />
        <BackButton />
      </div>
    </div>
  );
}

export default TestFormSection;
