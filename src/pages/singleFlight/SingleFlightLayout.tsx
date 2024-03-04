import { Outlet } from "react-router-dom";

export const SingleFlightLayout = () => {
  return (
    <div className="w-[90%]">
      <Outlet />
    </div>
  );
};
