import { Link } from "react-router-dom";

const LoggedMenu = () => {
  return (
    <div>
      <Link to="/orders">Zlecenia</Link>
      <Link to="/customers">Klienci</Link>
    </div>
  );
};

export default LoggedMenu;
