import Modal from "../../components/Modal/Modal";

import styles from "./LoginForm.module.scss";

const LoginForm = (props) => {
  return (
    <Modal
      isModalOpen={props.isModalOpen}
      handleOnCloseModal={props.handleCloseModal}
    >
      <div className={styles.wrapper}>
        <h4>MODAL</h4>
      </div>
    </Modal>
  );
};

export default LoginForm;
