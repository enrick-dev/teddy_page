import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";

const NavItems = () => {
  const { signOut } = useAuth();
  return (
    <div>
      <ul className="flex items-center gap-8 font-light">
        <li>
          <NavLink
            to="/clientes"
            className={({ isActive }) =>
              isActive ? "text-primary border-primary border-b" : ""
            }
          >
            Clientes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clientes-selecionados"
            className={({ isActive }) =>
              isActive ? "text-primary border-primary border-b" : ""
            }
          >
            Clientes selecionados
          </NavLink>
        </li>
        <li className="cursor-pointer" onClick={signOut}>
          Sair
        </li>
      </ul>
    </div>
  );
};

export default NavItems;
