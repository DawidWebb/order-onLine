import { useContext, useState } from "react";
import { Form, Field } from "react-final-form";
import Modal from "../Modal/Modal";
import Spinner from "../../components/Spinner/Spinner";
import MainButton from "../../components/Buttons/MainButton/MainButton";

import request from "../../helpers/request";
import { StoreContext } from "../../Store/StoreProvider";

import styles from "./AddClientForm.module.scss";

const required = (value) => (value ? undefined : "Pole wymagane");

const AddClientForm = (props) => {
  const {
    showSpinner,
    setShowSpinner,
    clientsData,
    setClientsData,
  } = useContext(StoreContext);

  const spinner = showSpinner ? <Spinner /> : "";

  const onSubmit = async (values) => {
    setShowSpinner(true);
    const clientObject = {
      companyName: values.companyName,
      companyAdress: values.companyAdress,
      vatNo: values.vatNo,
      eMail: values.eMail,
      info: values.info,
    };
    const { data, status } = await request.post("/clients", clientObject);
    console.log(status);
    if (status === 201) {
      setShowSpinner(false);
      props.handleOnClose();
      props.setClientAdded(true);
    } else {
      setShowSpinner(false);
      console.log(data.message);
    }
  };
  return (
    <Modal
      handleOnCloseModal={props.handleOnClose}
      isModalOpen={props.isModalOpen}
    >
      <div className={styles.wrapper}>
        <h3>Dodawanie nowego kontrahenta</h3>
        {/* <h3>{props.name}</h3> */}
        <Form
          onSubmit={onSubmit}
          // validate={validate}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputs}>
                <Field name="companyName" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <input
                        {...input}
                        type="text"
                        placeholder="Nazwa Firmy..."
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="companyAdress" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <input
                        {...input}
                        type="text"
                        placeholder="Adres Firmy..."
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="vatNo" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <input
                        {...input}
                        type="text"
                        placeholder="Nip: PL0000000000"
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="eMail" validate={required}>
                  {({ input, meta }) => (
                    <div className={styles.name}>
                      <input
                        {...input}
                        type="text"
                        placeholder="eMail: example@example.pl"
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <div className={styles.notes}>
                  <Field
                    name="info"
                    component="textarea"
                    placeholder="Info..."
                  />
                </div>
              </div>
              <div className={styles.buttons}>
                <MainButton type="submit" disabled={submitting} name="zapisz" />
                <button
                  type="button"
                  onClick={form.reset}
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
      {spinner}
    </Modal>
  );
};

export default AddClientForm;
