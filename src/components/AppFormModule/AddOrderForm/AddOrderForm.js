import { Form, Field } from "react-final-form";

import Modal from "../../Modal/Modal";
import MainButton from "../../Buttons/MainButton/MainButton";

import styles from "./AddOrderForm.module.scss";

const AddOrderForm = (props) => {
  const onSubmit = async (values) => {
    const newOrderObject = {
      loadDate: values.loadDate,
      loadHrs: values.loadHrs,
      loadCountry: !values.loadCountry
        ? props.orderObject.loadCountry
        : values.loadCountry,
      loadZip: !values.loadZip ? props.orderObject.loadZip : values.loadZip,
      loadCity: !values.loadCity ? props.orderObject.loadCity : values.loadCity,
      loadAdress: !values.loadAdress
        ? props.orderObject.loadAdress
        : values.loadAdress,
      unloadDate: values.unloadDate,
      unloadHrs: values.unloadHrs,
      unloadCountry: !values.unloadCountry
        ? props.orderObject.unloadCountry
        : values.unloadCountry,
      unloadZip: !values.unloadZip
        ? props.orderObject.unloadZip
        : values.unloadZip,
      unloadCity: !values.unloadCity
        ? props.orderObject.unloadCity
        : values.unloadCity,
      unloadAdress: !values.unloadAdress
        ? props.orderObject.unloadAdress
        : values.unloadAdress,
      goodsSpecyfications: !values.goodsSpecification
        ? props.orderObject.goodsSpecification
        : values.goodsSpecification,
      driver: !values.driver ? props.orderObject.driver : values.driver,
      truck: !values.truck ? props.orderObject.truck : values.truck,
      adr: !values.adr ? "" : values.adr[0],
      fix: !values.fix ? "" : values.fix[0],
      info: values.info,
    };
    props.setOrderObject(newOrderObject);
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
              <div className={styles.load}>
                <h4>załadunek</h4>
                <div className={styles.hrsdate}>
                  <Field name="loadDate" type="date" component="input" />

                  <Field
                    name="loadHrs"
                    type="text"
                    placeholder="godzina"
                    component="input"
                  />
                </div>
                <div>
                  <label>kraj</label>
                  <Field name="loadCountry" component="select">
                    <option>{props.orderObject.loadCountry}</option>
                    <option value="AT">AT</option>
                    <option value="BE">BE</option>
                    <option value="CH">CH</option>
                    <option value="CZ">CZ</option>
                    <option value="DE">DE</option>
                    <option value="ES">ES</option>
                    <option value="FR">FR</option>
                    <option value="GB">GB</option>
                    <option value="HU">HU</option>
                    <option value="IT">IT</option>
                    <option value="LU">LU</option>
                    <option value="PL">PL</option>
                    <option value="PT">PT</option>
                    <option value="RO">RO</option>
                    <option value="SE">SE</option>
                    <option value="SK">SK</option>
                    <option value="TR">TR</option>
                  </Field>
                  <Field
                    name="loadZip"
                    type="text"
                    placeholder={
                      !props.orderObject.loadZip
                        ? "kod pocztowy"
                        : props.orderObject.loadZip
                    }
                    component="input"
                  />
                </div>
                <div>
                  <Field
                    name="loadCity"
                    type="text"
                    placeholder={
                      !props.orderObject.loadCity
                        ? "miasto"
                        : props.orderObject.loadCity
                    }
                    component="input"
                  />
                  <Field
                    name="loadAdress"
                    type="text"
                    placeholder={
                      !props.orderObject.loadAdress
                        ? "adres"
                        : props.orderObject.loadAdress
                    }
                    component="input"
                  />
                </div>
              </div>
              <div className={styles.unload}>
                <h4>rozładunek</h4>
                <div className={styles.hrsdate}>
                  <Field name="unloadDate" type="date" component="input" />

                  <Field
                    name="unloadHrs"
                    type="text"
                    placeholder="godzina"
                    component="input"
                  />
                </div>
                <div>
                  <label>kraj</label>
                  <Field name="unloadCountry" component="select">
                    <option>{props.orderObject.unloadCountry}</option>
                    <option value="AT">AT</option>
                    <option value="BE">BE</option>
                    <option value="CH">CH</option>
                    <option value="CZ">CZ</option>
                    <option value="DE">DE</option>
                    <option value="ES">ES</option>
                    <option value="FR">FR</option>
                    <option value="GB">GB</option>
                    <option value="HU">HU</option>
                    <option value="IT">IT</option>
                    <option value="LU">LU</option>
                    <option value="PL">PL</option>
                    <option value="PT">PT</option>
                    <option value="RO">RO</option>
                    <option value="SE">SE</option>
                    <option value="SK">SK</option>
                    <option value="TR">TR</option>
                  </Field>
                  <Field
                    name="unloadZip"
                    type="text"
                    placeholder={
                      !props.orderObject.unloadZip
                        ? "kod pocztowy"
                        : props.orderObject.unloadZip
                    }
                    component="input"
                  />
                </div>
                <div>
                  <Field
                    name="unloadCity"
                    type="text"
                    placeholder={
                      !props.orderObject.unloadCity
                        ? "miasto"
                        : props.orderObject.unloadCity
                    }
                    component="input"
                  />
                  <Field
                    name="unloadAdress"
                    type="text"
                    placeholder={
                      !props.orderObject.unloadAdress
                        ? "adres"
                        : props.orderObject.unloadAdress
                    }
                    component="input"
                  />
                </div>
              </div>
              <div className={styles.informations}>
                <h4>dane zlecenia</h4>
                <div>
                  <Field
                    name="goodsSpecification"
                    type="text"
                    placeholder={
                      !props.orderObject.goodsSpecification
                        ? "Spacyfikacja ładunku"
                        : props.orderObject.goodsSpecification
                    }
                    component="textarea"
                  />
                </div>
                <div>
                  <Field
                    name="driver"
                    type="text"
                    placeholder={
                      !props.orderObject.driver
                        ? "kierowca"
                        : props.orderObject.driver
                    }
                    component="input"
                  />

                  <Field
                    name="truck"
                    type="text"
                    placeholder={
                      !props.orderObject.truck
                        ? "pojazd"
                        : props.orderObject.truck
                    }
                    component="input"
                  />
                </div>
                <div>
                  <Field
                    name="fix"
                    component="input"
                    type="checkbox"
                    value="Daty i Godziny FIX"
                  />
                  <label>FIX</label>

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
                    name="notes"
                    component="textarea"
                    placeholder={"uwagi..."}
                  />
                </div>
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

export default AddOrderForm;
