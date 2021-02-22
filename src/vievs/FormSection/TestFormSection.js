import BackButton from "../../components/Buttons/BackButton/BackButton";

import styles from "./TestFormSection.module.scss";

function TestFormSection() {
  return (
    <div className={styles.wrapper}>
      <h2>In this place will be form</h2>
      <div className={styles.backButton}>
        <BackButton />
      </div>
    </div>
  );
}

export default TestFormSection;
