import {
  setDepatrure,
  allFlights,
  oneFlight,
} from "@/redux/slices/flightsSlice";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { Outlet } from "react-router-dom";
import dayjs from "dayjs";
import { useEffect } from "react";
import DatePicker from "../generalComponents/DatePicker";

import { Button } from "../components/ui/button";
import FlightWidget from "@/generalComponents/FlightWidget/FlightWidget.tsx";
function Home() {
  const flights = useAppSelector(allFlights);
  const flightSingke = useAppSelector((state) => oneFlight(state, "tcp123"));

  const iz101keyMoments = flights.find(
    (flight) => flight.flightId === "tcp123"
  )!.keyMoments;

  const dispatch = useAppDispatch();

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

  useEffect(() => {
    console.log(shiftFiledPersentage);
  }, []);

  return (
    <div className="   w-full  ">
      <Button variant={"destructive"}>fdfdfsdf</Button>
      <div>
        <div className="text-lg">Upcoming lfights </div>
        <button
          onClick={() =>
            dispatch(
              setDepatrure({ flightId: "tcp123", date: dayjs("2021-1-24") })
            )
          }
        >
          add
        </button>
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
      </div>
      <img src=" user.svg" alt="434" className="w-4" />
    </div>
  );
}

export default Home;
