import FlightTimeLine from "@/generalComponents/fightTimeLine/FlightTimeLine";
import { useAppSelector } from "@/hooks/hooks";
import { oneFlight } from "@/redux/slices/flightsSlice";
import ThreeFlightDetails from "./ThreeFlightDetails";

import { Link, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import SingleFlightTabs from "./SingleFlightTabs";
import EditFlight from "@/generalComponents/editFlight/EditFlight";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";

const SingleFlight = () => {
  const navigate = useNavigate();
  const { flightID } = useParams();
  if (flightID == undefined || "") {
    return <div>A problem occured</div>;
  }

  const flight = useAppSelector((state) => oneFlight(state, flightID));

  const now = dayjs();
  const isFlightActive =
    now.isAfter(flight?.keyMoments.planned.shiftStarts) &&
    now.isBefore(flight?.keyMoments.planned.departure);

  if (!flight) {
    useEffect(() => {
      navigate("/");
    }, []);
    return null;
  } else {
    useEffect(() => {
      window.scroll(0, 0);
    }, []);
    return (
      <div className=" flex justify-center items-center  flex-col relative ">
        <div className=" flex justify-between items-center w-contentMaxWidth">
          <Link
            to={"/"}
            className=" bg-lightGray  rounded-xl w-7 h-7 flex justify-center items-center"
          >
            <img src="/arrow.svg" alt="432  " className="rotate-180 w-4 " />
          </Link>

          {isFlightActive && (
            <span className="relative flex h-4 w-7  ">
              <span className="relative rounded-full h-4 w-7 text-sm font-semibold   text-white bg-blue flex justify-center items-center">
                live
              </span>

              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue opacity-75"></span>
            </span>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger>
              {" "}
              <div className=" bg-lightGray  rounded-xl w-7 h-7 flex justify-center items-center">
                <img
                  src="/ellipsis-vertical.svg"
                  alt="432  "
                  className=" w-[7px]"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="left"
              align="start"
              sideOffset={20}
              className="shadow-xl"
            >
              <div className="w-[150px]  flex flex-col ">
                <div className="w-full  p-3">
                  <EditFlight />
                </div>
                <div className="flex justify-start items-center gap-2.5 font-medium p-3 pt-[0px]">
                  <img src="/trash-can-xmark-blue.svg" alt="" className="w-3" />
                  <div> Delete</div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className=" font-bold text-3xl my-5  w-10/12 flex flex-col justify-center items-center   ">
          <div className=" text-gray font-semibold text-lg">Flight no.</div>
          <div>{flight.flightNumber}</div>
        </div>
        <div className=" w-full flex justify-center items-center flex-col">
          <img src="/origin-to-destenation.svg" alt="" className="w-[80%]" />
          <div className=" flex justify-between items-center w-full mb-5 mt-2.5">
            <div className="">
              <div className=" text-2xl font-bold text-blue">
                {flight.origin.code}
              </div>
              <div className=" text-gray text-sm font-semibold ">
                {flight.origin.name}
              </div>
            </div>
            <div>
              <div className=" text-2xl font-bold text-blue">
                {flight.destenation.code}
              </div>
              <div className=" text-gray text-sm font-semibold ">
                {flight.destenation.name}
              </div>
            </div>
          </div>
        </div>
        <ThreeFlightDetails flight={flight} />
        <div className=" font-bold text-2xl mt-6 mb-5 self-start">
          Flight Time Line
        </div>
        <FlightTimeLine flight={flight} />
        <div className=" font-bold text-2xl mt-6 mb-4 self-start">
          Flight Details
        </div>

        <div className=" border-lightGray border-[3px] w-contentMaxWidth  max-w-screen-md rounded-2xl p-4">
          <SingleFlightTabs />
        </div>
      </div>
    );
  }
};

export default SingleFlight;
