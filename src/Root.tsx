import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "./hooks/hooks";
import { getAllFlights, getAllTLVFlights } from "./redux/slices/flightsSlice";
import { getAllAgents } from "./redux/slices/agentsSlice";
import { getAllAirPorts } from "./redux/slices/airportsSlice";

const Root = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllFlights());
    dispatch(getAllTLVFlights());
    dispatch(getAllAgents());
    dispatch(getAllAirPorts());
  }, []);
  return (
    <div className="py-[6vw] w-contentMaxWidth max-w-screen-md flex justify-center items-center  select-none ">
      <Outlet />
    </div>
  );
};

export default Root;
