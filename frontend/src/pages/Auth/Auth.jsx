import { Outlet } from "react-router-dom";

export const Auth = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-10">
      <div>
        <h1 className="text-2xl font-bold">
          <span className="text-orange-500">Habbit</span> Tracker
        </h1>
      </div>
      <Outlet />
    </div>
  );
};
