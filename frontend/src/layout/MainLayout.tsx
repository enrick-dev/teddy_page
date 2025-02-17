import React from "react";
import { Outlet } from "react-router-dom";
import NavApp from "../ components/navbar/nav-app";

const MainLayout: React.FC = () => {
  return (
    <div className="flex h-dvh w-dvw flex-col">
      <div className="flex-initial">
        <NavApp />
      </div>
      <div className="bg-muted flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
