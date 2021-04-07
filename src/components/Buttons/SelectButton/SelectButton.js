import styles from "./selectButton.module.scss";

function SelectButton({ name, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      className={!disabled ? styles.selectButton : styles.buttonDisabled}
      disabled={disabled}
    >
      {name}
    </button>
  );
}

export default SelectButton;
