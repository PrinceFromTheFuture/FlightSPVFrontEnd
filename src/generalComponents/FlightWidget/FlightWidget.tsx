import { flightInterface } from "@/types";
import Details from "./Details";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

interface FlightWidgetProps {
  flight: flightInterface;
}
const FlightWidget = ({ flight }: FlightWidgetProps) => {
  const now = dayjs();

  const isFlightActive =
    now.isAfter(flight.keyMoments.planned.shiftStarts) &&
    now.isBefore(flight.keyMoments.planned.departure);

  return (
    <Link className="w-full " to={`/singleFlight/${flight.flightId}`}>
      <div
        className="w-full rounded-t-xl  p-4 flex justify-between 
        bg-lightGray relative"
      >
        {isFlightActive && (
          <span
            style={{ top: "-8px" }}
            className=" absolute inline-flex rounded-full h-3 w-3 bg-blue left-3"
          >
            <span className="  animate-ping  inline-flex h-full w-full rounded-full bg-blue opacity-75 "></span>
          </span>
        )}

        <div>
          <Details
            title="Start of shift"
            value={flight.keyMoments.planned.shiftStarts.format("HH:mm A")}
          />

          <Details title="Flight no." value={flight.flightNumber} />
        </div>
        <div className=" w-4 mt-2">
          <img src=" plane-departure-gray.svg" alt="" className="w-4" />
        </div>
        <div>
          <Details
            title="Departure"
            value={flight.keyMoments.planned.departure.format("HH:mm A")}
          />
          <Details title="Role" value={flight.personalRole} />
        </div>
      </div>
      <div className="w-full rounded-b-xl p-3 border-t-2 border-gray border-dashed  relative bg-lightGray flex justify-center items-center">
        <div className=" text-gray font-semibold">
          Click to <span className="text-blue font-bold">view more</span>
        </div>
        <div className=" rounded-full w-5 bg-white h-5 absolute -top-2.5 -left-2.5" />
        <div className=" rounded-full w-5 bg-white h-5 absolute -top-2.5 -right-2.5" />
      </div>
    </Link>
  );
};

export default FlightWidget;
