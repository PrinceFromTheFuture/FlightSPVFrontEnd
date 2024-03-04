import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="py-[6vw] w-contentMaxWidth max-w-screen-md flex justify-center items-center  select-none ">
      <Outlet />
    </div>
  );
};

export default Root;
