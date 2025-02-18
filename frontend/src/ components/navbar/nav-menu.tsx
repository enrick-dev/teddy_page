import Sidebar from "../sidebar/side-app";

const NavMenu = () => {
  return (
    <div>
      <Sidebar />
      <div>
        <img
          src="logo.png"
          alt="Logo Teddy Open Finance"
          className="w-[100px]"
        />
      </div>
    </div>
  );
};

export default NavMenu;
