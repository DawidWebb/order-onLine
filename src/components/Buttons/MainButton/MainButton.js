import styles from "./mainButton.module.scss";

function MainButton({ name, onClick, disabled, type }) {
  return (
    <button
      onClick={onClick}
      className={!disabled ? styles.mainButton : styles.buttonDisabled}
      disabled={disabled}
      type={type}
    >
      {name}
    </button>
  );
}

export default MainButton;
