import { useHistory } from "react-router-dom";

import styles from "./BackButton.module.scss";

const BackButton = () => {
  const history = useHistory();
  const handleGoBack = () => {
    history.goBack();
  };
  return (
    <button onClick={handleGoBack} className={styles.selectButton}>
      wstecz
    </button>
  );
};

export default BackButton;
