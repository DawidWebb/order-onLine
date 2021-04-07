import styles from "./smallButton.module.scss";

function SmallButton({ name, onClick }) {
  return (
    <button onClick={onClick} className={styles.smallButton}>
      {name}
    </button>
  );
}

export default SmallButton;
