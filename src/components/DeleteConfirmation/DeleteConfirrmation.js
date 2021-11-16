import Modal from "../Modal/Modal";
import MainButton from "../Buttons/MainButton/MainButton";

import styles from "./DeleteConfirmation.module.scss";

const DeleteConfirmation = ({
  deleteConfirm,
  confirmationModalOpen,
  handleCloseModal,
}) => {
  const handleConfirmDelete = () => {
    deleteConfirm();
    handleCloseModal();
  };
  return (
    <Modal
      isModalOpen={confirmationModalOpen}
      handleOnCloseModal={handleCloseModal}
    >
      <div className={styles.wrapper}>
        <h3>Potwierdzasz usunięcie?</h3>
        <div className={styles.buttons}>
          <MainButton name="usuń" onClick={handleConfirmDelete} />
          <MainButton name="wyjdź" onClick={handleCloseModal} />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmation;
