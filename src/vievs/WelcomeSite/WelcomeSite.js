import { Link } from "react-router-dom";

import SpinnerStatic from "../../components/Spinner/SpinnerStatic";

import styles from "./welcomeSite.module.scss";

const WelcomeSite = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Witaj w aplikacji do zarządzania zleceniami</h1>
      <div className={styles.info}>
        <ul>
          <li>Moduł testowy nie wymaga logowania,</li>
          <li>
            Testując aplikację nie masz upawnień do zapisywnia, odczytywania i
            modyfikacji danych klienta i zlecenia,
          </li>
          <li>
            W module testowym nie jestś połączony z bazą danych, wykorzystywana
            jest pamięć przegladarki i pliki cookie,
          </li>
          <li>
            Zapoznaj się z zasadami{" "}
            <Link to={"/rodo"}>RODO i polityką Cookies</Link>
          </li>
          <li>
            Instrukja użytkowania znajduje się{" "}
            <Link to={"/instruction"}>tutaj</Link>
          </li>
          <li>
            Jesteś zainteresowany pełną wersją?{" "}
            <Link to={"/contact"}>KLIKNIJ</Link>
          </li>
        </ul>
      </div>
      <div className={styles.spinner}>
        <SpinnerStatic />
      </div>
    </div>
  );
};

export default WelcomeSite;
