import { useAuth } from "../../context/auth";

const NavUser = () => {
  const { name, username } = useAuth();

  return (
    <div className="text-right">
      <div>
        Olá, <span className="font-bold">{name}</span>
      </div>
      <p className="text-muted-foreground/60 text-sm">{username}</p>
    </div>
  );
};

export default NavUser;
