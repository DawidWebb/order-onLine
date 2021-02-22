import styles from "./MainButton.module.scss";

function MainButton({ name, onClick, disabled, type }) {
  return (
    <button
      onClick={onClick}
      className={styles.mainButton}
      disabled={disabled}
      type={type}
    >
      {name}
    </button>
  );
}

export default MainButton;
