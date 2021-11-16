import Modal from "../Modal/Modal";

import styles from "./InformationPopup.module.scss";

const InformationPopup = ({ taskInformation }) => {
  return (
    <Modal isModalOpen={taskInformation}>
      <div className={styles.wrapper}>
        <p>{taskInformation}</p>
      </div>
    </Modal>
  );
};

export default InformationPopup;
