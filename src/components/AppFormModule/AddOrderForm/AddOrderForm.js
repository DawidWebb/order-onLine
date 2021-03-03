import { useState } from "react";
import { Form, Field } from "react-final-form";

import Modal from "../../Modal/Modal";

import MainButton from "../../Buttons/MainButton/MainButton";

import styles from "./AddOrderForm.module.scss";

const AddOrderForm = (props) => {
  const onSubmit = async (values) => {
    props.setOrderObject(values);
    props.handleOnClose();
  };
  return (
    <Modal
      handleOnCloseModal={props.handleOnClose}
      isModalOpen={props.isModalOpen}
    >
      <div className={styles.wrapper}>
        <h4>Dodawanie zlecenia</h4>

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
                <Field name="loadDate">
                  {({ input, meta }) => (
                    <div className={styles.dateOf}>
                      <label htmlFor="loadDate">Data załadunku</label>
                      <input
                        className={styles.dateInput}
                        {...input}
                        type="date"
                        placeholder="Data załadunku"
                      />
                    </div>
                  )}
                </Field>
                <Field name="loadHrs">
                  {({ input, meta }) => (
                    <input
                      {...input}
                      type="text"
                      placeholder="Godzina załadunku"
                    />
                  )}
                </Field>
                <Field name="loadAdress">
                  {({ input, meta }) => (
                    <div>
                      <input
                        {...input}
                        type="text"
                        placeholder="Adres załadunku"
                      />
                    </div>
                  )}
                </Field>

                <Field name="unloadDate">
                  {({ input, meta }) => (
                    <div className={styles.dateOf}>
                      <label htmlFor="unloadDate">Data rozładunku</label>
                      <input
                        className={styles.dateInput}
                        {...input}
                        type="date"
                        placeholder="Data rozładunku"
                      />
                    </div>
                  )}
                </Field>
                <Field name="unloadHrs">
                  {({ input, meta }) => (
                    <input
                      {...input}
                      type="text"
                      placeholder="Godzina rozładunku"
                    />
                  )}
                </Field>

                <Field name="unloadAdress">
                  {({ input, meta }) => (
                    <div className={styles.name}>
                      <input
                        {...input}
                        type="text"
                        placeholder="Adres rozładunku"
                      />
                    </div>
                  )}
                </Field>
                <Field name="goodsSpecification">
                  {({ input, meta }) => (
                    <div className={styles.name}>
                      <input
                        {...input}
                        type="text"
                        placeholder="Specyfikacja ładunku"
                      />
                    </div>
                  )}
                </Field>
                <Field name="driver">
                  {({ input, meta }) => (
                    <div className={styles.name}>
                      <input
                        {...input}
                        type="text"
                        placeholder="Dane kierowcy"
                      />
                    </div>
                  )}
                </Field>
                <Field name="truck">
                  {({ input, meta }) => (
                    <div className={styles.name}>
                      <input
                        {...input}
                        type="text"
                        placeholder="Dane pojazdu"
                      />
                    </div>
                  )}
                </Field>
                <div className={styles.options}>
                  <div>
                    <Field
                      name="adr"
                      component="input"
                      type="checkbox"
                      value="Towary niebezpieczne objęte ADR"
                    />
                    <label>ADR</label>
                  </div>
                  <div>
                    <Field
                      name="fix"
                      component="input"
                      type="checkbox"
                      value="Daty i Godziny FIX"
                    />
                    <label>Fix</label>
                  </div>
                </div>
                <div className={styles.notes}>
                  <Field
                    name="notes"
                    component="textarea"
                    placeholder="uwagi..."
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
      <div className={styles.spinnerWrapper}></div>
    </Modal>
  );
};

export default AddOrderForm;
