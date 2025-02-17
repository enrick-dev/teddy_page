import NavItems from "./nav-items";
import NavMenu from "./nav-menu";
import NavUser from "./nav-user";

const NavApp = () => {
  return (
    <nav className="flex items-center justify-between gap-4 border-b border-[#0000001A] px-[120px] py-[26px] shadow">
      <NavMenu />
      <NavItems />
      <NavUser />
    </nav>
  );
};

export default NavApp;
