import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SelectButton from "../../components/Buttons/SelectButton/SelectButton";
import BackButton from "../../components/Buttons/BackButton/BackButton";

import styles from "./Orders.module.scss";

const Orders = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Moduł zlecenia</h1>
      <div className={styles.selectButttons}>
        <Link to="addorder">
          <SelectButton name="dodaj zlecenie" />
        </Link>

        <Link to="showorders">
          <SelectButton name="pokaż zlecenia" />
        </Link>
        <BackButton />
      </div>
    </div>
  );
};

export default Orders;
