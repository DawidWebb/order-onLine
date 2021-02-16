import SelectButton from "../../components/Buttons/SelectButton/SelectButton";

import styles from "./MainSection.module.scss";

function MainSection() {
  return (
    <div className={styles.container}>
      <div className={styles.loginApp}>
        <SelectButton name={"logowanie"} />
      </div>
      <div className={styles.testApp}>
        <SelectButton name={"testuj"} />
      </div>
    </div>
  );
}

export default MainSection;
