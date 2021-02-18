import { Link } from "react-router-dom";

const LoggedMenu = () => {
  return (
    <div>
      <Link to="/app-form">Dodaj zlecenie</Link>
      <button>Dodaj kontrahenta</button>
      <button>Lista Zleceń</button>
      <button>Lista Kontrahentów</button>
    </div>
  );
};

export default LoggedMenu;
