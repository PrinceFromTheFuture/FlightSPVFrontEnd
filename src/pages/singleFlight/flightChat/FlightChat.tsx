import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { oneFlight } from "@/redux/slices/flightsSlice";
import dayjs from "dayjs";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const FlightChat = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { flightID } = useParams();
  if (flightID == undefined || "") {
    return <div>A problem occured</div>;
  }

  const flight = useAppSelector((state) => oneFlight(state, flightID));
  if (!flight) {
    useEffect(() => {
      navigate("/");
    }, []);
    return null;
  }

  return (
    <div className=" flex justify-between items-center  flex-col  fixed  right-[0px] left-[0px] top-[0px] bottom-[0px] bg-lightGray">
      <div className="  bg-blue pt-[6vw] w-full flex justify-center pb-[6vw] items-center ">
        <div className="w-contentMaxWidth flex justify-start items-center ">
          <Link
            to={`/singleFlight/${flightID}`}
            className=" bg-lightGray/25  rounded-xl w-7 h-7 flex justify-center items-center"
          >
            <img src="/arrow.svg" alt="432  " className="rotate-180 w-4 " />
          </Link>
          <div className="ml-3 text-xl font-semibold text-white">
            {" "}
            {flight.flightNumber}{" "}
            <span className="text-gray font-medium text-lg">
              {dayjs(flight.keyMoments.planned.departure).format("DD/MM ddd")}
            </span>
          </div>
        </div>
      </div>
      <div className=" bottom-[0px] w-contentMaxWidth mb-[6vw]  flex  justify-between gap-2 items-center ">
        <div className=" w-full bg-white rounded-md shadow-sm flex justify-between items-center p-3">
          <textarea
            name=""
            id=""
            className="w-full outline-none border-none h-5"
          ></textarea>
          <div className="w-4 flex justify-center items-center h-full">
            <img src="/paper-plane-solid.svg" alt="" />
          </div>
        </div>
        <div className="w-8  h-full bg-blue rounded-md shadow-sm flex justify-center items-center ">
          <img src="/camera-solid.svg" className="w-1/2" alt="" />
        </div>
      </div>
    </div>
  );
};

export default FlightChat;
