import { Form, Field } from "react-final-form";

import Modal from "../../Modal/Modal";

import MainButton from "../../Buttons/MainButton/MainButton";

import styles from "./AddConditionsForm.module.scss";

const AddConditionsForm = (props) => {
  const onSubmit = async (values) => {
    props.setConditions(values);
    props.handleOnClose();
  };

  return (
    <Modal
      handleOnCloseModal={props.handleOnClose}
      isModalOpen={props.isModalOpen}
    >
      <div className={styles.wrapper}>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.clientPrice}>
                <label>Fracht klienta:</label>
                <Field name="clientPrice" type="text" component="input" />

                <Field name="clientCurr" component="select">
                  <option value=""> </option>
                  <option value="Eur">Eur</option>
                  <option value="Pln">Pln</option>
                </Field>

                <label>Termin klienta:</label>
                <Field name="clientTerms" type="text" component="input" />
              </div>

              <div className={styles.carrierPrice}>
                <label>Fracht ptrzewoźnika:</label>
                <Field name="carrierPrice" type="text" component="input" />
                <Field name="carrierCurr" component="select">
                  <option value=""> </option>
                  <option value="Eur">Eur</option>
                  <option value="Pln">Pln</option>
                </Field>
                <label>Termin przewoźnika:</label>
                <Field name="carrierTerms" type="text" component="input" />
              </div>
              <div className={styles.buttons}>
                <MainButton type="submit" disabled={submitting} name="zapisz" />
                <button
                  type="button"
                  onClick={() => {
                    form.reset();
                    props.setOrderObject(false);
                  }}
                  disabled={submitting || pristine}
                  className={styles.resetButton}
                >
                  reset
                </button>

                <MainButton
                  type="button"
                  onClick={props.handleOnClose}
                  name="wyjdź"
                />
              </div>
            </form>
          )}
        />
      </div>
      <div className={styles.spinnerWrapper}></div>
    </Modal>
  );
};

export default AddConditionsForm;
