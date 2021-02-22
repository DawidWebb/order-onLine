import { useContext, useState } from "react";
import { Form, Field } from "react-final-form";
import Modal from "../Modal/Modal";
import Spinner from "../../components/Spinner/Spinner";
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
      setClientsData((prev) => [...prev, clientObject]);
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
        <p>Dodawanie nowego kontrahenta</p>
        <h3>{props.name}</h3>
        <Form
          onSubmit={onSubmit}
          // validate={validate}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputs}>
                <Field name="companyName" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <label>Nazwa Firmy</label>
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
                      <label>Adres Firmy</label>
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
                      <label>Nip</label>
                      <input
                        {...input}
                        type="text"
                        placeholder="PL0000000000"
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="eMail" validate={required}>
                  {({ input, meta }) => (
                    <div className={styles.name}>
                      <label>Adres eMail</label>
                      <input
                        {...input}
                        type="text"
                        placeholder="example@example.pl"
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <div className={styles.notes}>
                  <label>Dodatkowe info</label>
                  <Field
                    name="info"
                    component="textarea"
                    placeholder="Info..."
                  />
                </div>
              </div>
              <div className={styles.buttons}>
                <button
                  type="submit"
                  disabled={submitting}
                  //   onClick={props.handleOnClose}
                >
                  Zapisz
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
                <button onClick={props.handleOnClose} type="button">
                  Wyjdź
                </button>
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
