import { useContext, useEffect, useState } from "react";
import { Form, Field } from "react-final-form";
import Modal from "../../Modal/Modal";
import Spinner from "../../Spinner/Spinner";
import MainButton from "../../Buttons/MainButton/MainButton";

import request from "../../../helpers/request";
import { StoreContext } from "../../../Store/StoreProvider";

import styles from "./AddClientForm.module.scss";

const required = (value) => (value ? undefined : "Pole wymagane");

const AddClientForm = (props) => {
  const {
    clientsData,
    setClientsData,
    user,
    cookie,
    setSerchedClient,
    setTaskInformation,
  } = useContext(StoreContext);

  const [showSpinner, setShowSpinner] = useState(false);
  const [validateMessage, setValidateMessage] = useState("");

  const spinner = showSpinner ? <Spinner /> : "";

  const resetStateOfInput = () => {
    setValidateMessage("");
  };

  const onSubmit = async (values) => {
    setShowSpinner(true);
    const clientObject = {
      companyName: values.companyName,
      companyAdress: values.companyAdress,
      vatNo: values.vatNo,
      eMail: values.eMail,
      info: values.info,
    };
    if (user || cookie) {
      const { data, status } = await request.post("/clients", clientObject);
      if (status === 201) {
        props.handleOnClose();
        resetStateOfInput();
        setClientsData((prev) => [...prev, data.data]);
        setSerchedClient(data.data);

        setShowSpinner(false);
        props.setTaskInformation("Dodano klienta");
      } else if (status === 409) {
        setShowSpinner(false);
        setValidateMessage(data.message);
      } else {
        setShowSpinner(false);
        console.log(data.message);
      }
    } else if (props.thisIsCompanyProfile) {
      localStorage.setItem(`companyData`, JSON.stringify(clientObject));
      props.setTaskInformation("Dodano dane firmy");
      setShowSpinner(false);
      props.handleOnClose();
    } else {
      setSerchedClient([clientObject]);
      setShowSpinner(false);
      props.handleOnClose();
      resetStateOfInput();
    }
  };

  useEffect(
    (values) => {
      if (props.isModalOpen) {
        resetStateOfInput();
      }
    },
    [props.isModalOpen]
  );

  const clientExist = validateMessage.length ? (
    <h2>{validateMessage}</h2>
  ) : null;

  return (
    <Modal
      handleOnCloseModal={props.handleOnClose}
      isModalOpen={props.isModalOpen}
    >
      <div className={styles.wrapper}>
        <h3>Dodawanie nowego kontrahenta</h3>
        <div className={styles.validateMessage}>{clientExist}</div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form
              className={styles.form}
              onSubmit={(event) => {
                const promise = handleSubmit(event);
                promise &&
                  promise.then(() => {
                    form.reset();
                  });
                return promise;
              }}
            >
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
      <div className={styles.spinnerWrapper}>{spinner}</div>
    </Modal>
  );
};

export default AddClientForm;
