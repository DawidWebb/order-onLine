import styles from "./MainButton.module.scss";

function MainButton({ name, onClick }) {
  return (
    <button onClick={onClick} className={styles.mainButton}>
      {name}
    </button>
  );
}

export default MainButton;
