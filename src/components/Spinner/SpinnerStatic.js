import styles from "./SpinnerStatic.module.scss";

const SpinnerStatic = () => {
  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.smallCircle}></div>
        <div className={styles.bigCircle}></div>
      </div>
    </div>
  );
};

export default SpinnerStatic;
