import { useEffect, useState } from "react";
import styles from "./UpButton.module.scss";

const UpButton = () => {
  //   const { windowScroll, setWindowScroll } = useContext(StoreContext);
  const [windowScroll, setWindowScroll] = useState(false);

  const handleGoToTopPage = () => {
    window.scrollTo(0, 0);
  };
  const buttonViev = () => {
    if (!windowScroll) {
      return;
    }
    if (windowScroll) {
      return (
        <button onClick={handleGoToTopPage} className={styles.button}>
          UP
        </button>
      );
    }
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setWindowScroll(true);
    } else {
      setWindowScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <div>{buttonViev()}</div>;
};

export default UpButton;
