import styles from "./SelectButton.module.scss";

function SelectButton({ name, onClick }) {
  return (
    <button onClick={onClick} className={styles.selectButton}>
      {name}
    </button>
  );
}

export default SelectButton;
