import { useContext, useState } from "react";
import { Form, Field } from "react-final-form";
import Modal from "../Modal/Modal";
import Spinner from "../../components/Spinner/Spinner";
import MainButton from "../../components/Buttons/MainButton/MainButton";

import request from "../../helpers/request";
import { StoreContext } from "../../Store/StoreProvider";

import styles from "./EditClientForm.module.scss";

const required = (value) => (value ? undefined : "Pole wymagane");

const AddClientForm = (props) => {
  const { clientsData, setClientsData } = useContext(StoreContext);

  const [showSpinner, setShowSpinner] = useState(false);

  const spinner = showSpinner ? <Spinner /> : "";

  const onSubmit = async (values) => {
    setShowSpinner(true);
    const clientObject = {
      clientId: props.clientData._id,
      companyName: !values.companyName
        ? props.clientData.companyName
        : values.companyName,
      companyAdress: !values.companyAdress
        ? props.clientData.companyAdress
        : values.companyAdress,
      vatNo: !values.vatNo ? props.clientData.vatNo : values.vatNo,
      eMail: !values.eMail ? props.clientData.eMail : values.eMail,
      info: !values.info ? props.clientData.info : values.info,
    };

    const { data, status } = await request.put("/clients", clientObject);

    if (status === 202) {
      props.handleOnClose();
      props.setClientEdited(true);
      const elementIndex = clientsData.findIndex(
        (item) => item._id === data.data._id
      );
      const newClientData = clientsData.splice(elementIndex, 1, data.data);
      setClientsData((prev) => [...prev]);
      props.setSerchedClient((prev) => [data.data]);
      setShowSpinner(false);
    } else {
      setShowSpinner(false);
      console.log(data.message, status);
    }
  };
  return (
    <Modal
      handleOnCloseModal={props.handleOnClose}
      isModalOpen={props.isModalOpen}
    >
      <div className={styles.wrapper}>
        <h3>Edycja kontrahenta</h3>

        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.inputs}>
                <Field name="companyName">
                  {({ input, meta }) => (
                    <div>
                      <input
                        {...input}
                        type="text"
                        placeholder={`${props.clientData.companyName}`}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="companyAdress">
                  {({ input, meta }) => (
                    <div>
                      <input
                        {...input}
                        type="text"
                        placeholder={`${props.clientData.companyAdress}`}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="vatNo">
                  {({ input, meta }) => (
                    <div>
                      <input
                        {...input}
                        type="text"
                        placeholder={`${props.clientData.vatNo}`}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Field name="eMail">
                  {({ input, meta }) => (
                    <div className={styles.name}>
                      <input
                        {...input}
                        type="text"
                        placeholder={`${props.clientData.eMail}`}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <div className={styles.notes}>
                  <Field
                    name="info"
                    component="textarea"
                    placeholder={`${
                      !props.clientData.info ? "" : props.clientData.info
                    }`}
                  />
                </div>
              </div>
              <div className={styles.buttons}>
                <MainButton type="submit" disabled={submitting} name="zapisz" />

                <MainButton
                  type="button"
                  onClick={props.handleOnClose}
                  name="anuluj"
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
