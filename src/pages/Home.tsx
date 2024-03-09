import { allFlights, oneFlight } from "@/redux/slices/flightsSlice";
import { useAppSelector } from "../hooks/hooks";
import { Outlet } from "react-router-dom";
import dayjs from "dayjs";
import DatePicker from "../generalComponents/DatePicker";

import { Button } from "../components/ui/button";
import FlightWidget from "@/generalComponents/FlightWidget/FlightWidget.tsx";
import Test1 from "./Test1";
function Home() {
  const flights = useAppSelector(allFlights);
  const flightSingke = useAppSelector((state) => oneFlight(state, "tcp123"));
  const flightSingke1 = useAppSelector((state) => oneFlight(state, "tcp1231"));

  const iz101keyMoments = flights.find(
    (flight) => flight.flightId === "tcp123"
  )!.keyMoments;

  const exampleNow = dayjs("2024-3-1T13:27");

  const shiftLength = iz101keyMoments.planned.departure.diff(
    iz101keyMoments.planned.shiftStarts,
    "m"
  );
  const shiftStartedToNow = exampleNow.diff(
    iz101keyMoments.planned.shiftStarts,
    "m"
  );

  const shiftFiledPersentage = Number(
    (shiftStartedToNow / shiftLength).toFixed(2)
  );

  const shiftFiledPersentageReal =
    shiftFiledPersentage <= 0 || shiftFiledPersentage > 1
      ? 0
      : shiftFiledPersentage;

  return (
    <div className="   w-full  ">
      <Button variant={"destructive"}>fdfdfsdf</Button>
      <div>
        <div className="text-lg">Upcoming lfights </div>

        <div className=" bg-lightGray" style={{ width: `20rem` }}>
          <div
            className="bg-gray"
            style={{ width: `${shiftFiledPersentageReal * 20}rem` }}
          >
            {iz101keyMoments.planned.departure.diff(
              iz101keyMoments.planned.countersOpening,
              "m"
            )}
          </div>
        </div>
        <div> {String(flightSingke)}</div>
        <Outlet />
      </div>
      <DatePicker></DatePicker>
      <div className="mt-5">
        <FlightWidget flight={flightSingke!}></FlightWidget>
        <FlightWidget flight={flightSingke1!}></FlightWidget>
      </div>
      <img src=" user.svg" alt="434" className="w-4" />
      <Test1 />
    </div>
  );
}

export default Home;
