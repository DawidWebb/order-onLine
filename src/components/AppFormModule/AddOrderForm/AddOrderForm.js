import { useContext } from "react";
import { Form, Field } from "react-final-form";

import Modal from "../../Modal/Modal";
import MainButton from "../../Buttons/MainButton/MainButton";

import { StoreContext } from "../../../Store/StoreProvider";

import styles from "./AddOrderForm.module.scss";

const AddOrderForm = (props) => {
  const { copiedOrderData } = useContext(StoreContext);

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
                    <option
                      value={
                        !copiedOrderData ? "" : props.orderObject.loadCountry
                      }
                    >
                      {!copiedOrderData ? "" : props.orderObject.loadCountry}
                    </option>
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
                      !copiedOrderData
                        ? "kod pocztowy"
                        : props.orderObject.loadZip
                    }
                    component="input"
                    value={!copiedOrderData ? "" : props.orderObject.loadZip}
                  />
                </div>
                <div>
                  <Field
                    name="loadCity"
                    type="text"
                    placeholder={
                      !copiedOrderData ? "miasto" : props.orderObject.loadCity
                    }
                    component="input"
                    value={!copiedOrderData ? "" : props.orderObject.loadCity}
                  />
                  <Field
                    name="loadAdress"
                    type="text"
                    placeholder={
                      !copiedOrderData ? "adres" : props.orderObject.loadAdress
                    }
                    component="input"
                    value={!copiedOrderData ? "" : props.orderObject.loadAdress}
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
                    <option
                      value={
                        !copiedOrderData ? "" : props.orderObject.unloadCountry
                      }
                    >
                      {!copiedOrderData ? "" : props.orderObject.unloadCountry}
                    </option>
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
                      !copiedOrderData
                        ? "kod pocztowy"
                        : props.orderObject.unloadZip
                    }
                    component="input"
                    value={!copiedOrderData ? "" : props.orderObject.unloadZip}
                  />
                </div>
                <div>
                  <Field
                    name="unloadCity"
                    type="text"
                    placeholder={
                      !copiedOrderData ? "miasto" : props.orderObject.unloadCity
                    }
                    component="input"
                    value={!copiedOrderData ? "" : props.orderObject.unloadCity}
                  />
                  <Field
                    name="unloadAdress"
                    type="text"
                    placeholder={
                      !copiedOrderData
                        ? "adres"
                        : props.orderObject.unloadAdress
                    }
                    component="input"
                    value={
                      !copiedOrderData ? "" : props.orderObject.unloadAdress
                    }
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
                      !copiedOrderData
                        ? "Spacyfikacja ładunku"
                        : props.orderObject.goodsSpecification
                    }
                    component="textarea"
                    value={
                      !copiedOrderData
                        ? ""
                        : props.orderObject.goodsSpecification
                    }
                  />
                </div>
                <div>
                  <Field
                    name="driver"
                    type="text"
                    placeholder={
                      !copiedOrderData ? "kierowca" : props.orderObject.driver
                    }
                    component="input"
                    value={!copiedOrderData ? "" : props.orderObject.driver}
                  />

                  <Field
                    name="truck"
                    type="text"
                    placeholder={
                      !copiedOrderData ? "pojazd" : props.orderObject.truck
                    }
                    component="input"
                    value={!copiedOrderData ? "" : props.orderObject.truck}
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
                    placeholder={
                      !copiedOrderData ? "uwagi..." : props.orderObject.truck
                    }
                    value={!copiedOrderData ? "" : props.orderObject.truck}
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
