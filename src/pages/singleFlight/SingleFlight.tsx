import FlightTimeLine from "@/generalComponents/fightTimeLine/FlightTimeLine";
import { useAppSelector } from "@/hooks/hooks";
import { oneFlight } from "@/redux/slices/flightsSlice";
import ThreeFlightDetails from "./ThreeFlightDetails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import SingleFlightTabs from "./SingleFlightTabs";
import { Test } from "./Test";

const SingleFlight = () => {
  const flight = useAppSelector((state) => oneFlight(state, "tcp123"));

  const now = dayjs();
  const isFlightActive =
    now.isAfter(flight?.keyMoments.planned.shiftStarts) &&
    now.isBefore(flight?.keyMoments.planned.departure);

  if (flight === undefined) {
    return <div>no flight</div>;
  } else {
    return (
      <div className=" flex justify-center items-center  flex-col relative ">
        <div className=" flex justify-between items-center w-contentMaxWidth">
          <Link to={"/"} className=" bg-lightGray p-2.5 rounded-xl">
            <img src="/arrow.svg" alt="432  " className="rotate-180 w-4 " />
          </Link>
          {isFlightActive && (
            <span className="relative flex h-4 w-7 mr-3">
              <span className="relative rounded-full h-4 w-7 text-sm font-semibold   text-white bg-blue flex justify-center items-center">
                live
              </span>

              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue opacity-75"></span>
            </span>
          )}
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
                {flight.origin.shortName}
              </div>
              <div className=" text-gray text-sm font-semibold ">
                {flight.origin.name}
              </div>
            </div>
            <div>
              <div className=" text-2xl font-bold text-blue">
                {flight.destenation.shortName}
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
          <SingleFlightTabs flight={flight} />
        </div>
        <div className="h-[50vh]">
          <Test />
        </div>
      </div>
    );
  }
};

export default SingleFlight;
