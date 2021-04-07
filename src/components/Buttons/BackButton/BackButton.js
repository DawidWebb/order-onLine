import { useHistory } from "react-router-dom";

import styles from "./backButton.module.scss";

const BackButton = () => {
  const history = useHistory();
  const handleGoBack = () => {
    history.goBack();
  };
  return (
    <button onClick={handleGoBack} className={styles.backButton}>
      wstecz
    </button>
  );
};

export default BackButton;
